"use client";

import { useState } from "react";
import { FrogSpec } from "@frogcrypto/shared";
import { ParcnetAPI, Zapp, connect } from "@parcnet-js/app-connector";
import { gpcPreVerify } from "@pcd/gpc";
import { ProtoPODGPC } from "@pcd/gpcircuits";
import { POD, PODEntries } from "@pcd/pod";
import { PartialDeep } from "type-fest";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export interface PODData {
  entries: PODEntries;
  signature: string;
  signerPublicKey: string;
}

export function podToPODData(pod: POD): PODData {
  return {
    entries: pod.content.asEntries(),
    signature: pod.signature,
    signerPublicKey: pod.signerPublicKey,
  };
}

type ForgCryptToType = PartialDeep<typeof FrogSpec.schema>;

const entriesToProve: ForgCryptToType = {
  beauty: {
    type: "int",
  },
  jump: {
    type: "int",
  },
  speed: {
    type: "int",
  },
  frogId: {
    type: "int",
  },
  name: {
    type: "string",
  },
  biome: {
    type: "int",
  },
  owner: {
    type: "cryptographic",
  },
  intelligence: {
    type: "int",
  },
  rarity: {
    type: "int",
  },
};

// TODO: Remove console logs
const myZapp: Zapp = {
  name: "Frog Bank",
  permissions: {
    READ_POD: { collections: ["FrogCrypto (alpha)"] },
    INSERT_POD: { collections: ["FrogCrypto (alpha)"] },
    REQUEST_PROOF: { collections: ["FrogCrypto (alpha)"] },
  },
};

const ZuAuth = () => {
  const { address: connectedAddress } = useAccount();
  const [z, setZ] = useState<ParcnetAPI | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const handleAuth = async () => {
    try {
      if (!connectedAddress) return notification.error("Please connect your address");

      const element = document.getElementById("zpass-app-connector") as HTMLElement;

      if (!element) {
        console.log("Unable to find app connector element");
        notification.error("Oops! Something went wrong");
        return;
      }

      console.log("The element was found", element);
      const clientUrl = "https://staging.zupass.org";

      setIsLoading(true);
      const zCon = await connect(myZapp, element, clientUrl);
      setZ(zCon);
      setIsLoading(false);

      notification.success("Authentication successful!");
    } catch (e) {
      console.log("error", e);
      setIsLoading(false);
      notification.error("Authentication failed");
    }
  };

  const handleMintNFT = async () => {
    try {
      if (!z) return notification.error("Please authenticate first");

      setIsLoading(true);
      const result = await z.gpc.prove({
        request: {
          pods: {
            FROGCRYPTO: {
              pod: {
                entries: entriesToProve,
              },
              revealed: {
                beauty: true,
                jump: true,
                speed: true,
                forgId: true,
                name: true,
                biome: true,
                owner: true,
                intelligence: true,
                rarity: true,
              },
            },
          },
        },
      });

      if (result.success) {
        const boundConfig = result.boundConfig;
        const revealedClaims = result.revealedClaims;
        console.log("The revealed claims", revealedClaims);
        console.log("The proof is:", result.proof);

        const circuit = gpcPreVerify(boundConfig, revealedClaims);
        const pubSignals = ProtoPODGPC.makePublicSignals(circuit.circuitPublicInputs, circuit.circuitOutputs);
        console.log("The public signals", pubSignals);

        const frogStats = revealedClaims.pods.FROGCRYPTO?.entries;
        console.log("The reveleadClaims", revealedClaims);
        console.log("The frog stats", frogStats);
        const frogName = frogStats?.name.value;

        console.log("The frogId is", frogStats?.frogId.value);
        const beauty = frogStats?.beauty.value as any as bigint;
        const biome = frogStats?.biome.value as any as bigint;
        const intelligence = frogStats?.intelligence.value as any as bigint;
        const jump = frogStats?.jump.value as any as bigint;
        const speed = frogStats?.speed.value as any as bigint;
        const rarity = frogStats?.rarity.value as any as bigint;
        const owner = frogStats?.owner.value as any as bigint;

        notification.info("Minting your Frog NFT...");

        const mintResult = await writeYourContractAsync({
          functionName: "mintFrog",
          args: [
            {
              _pA: result.proof.pi_a.slice(0, -1),
              _pB: result.proof.pi_b.slice(0, -1),
              _pC: result.proof.pi_c.slice(0, -1),
              _pubSignals: pubSignals as any,
            },
            {
              beauty,
              biome,
              intelligence,
              jump,
              speed,
              rarity,
              owner,
            },
          ],
        });

        console.log("Mint transaction:", mintResult);
        notification.success(`Successfully minted Frog NFT: ${frogName}`);
      }
    } catch (e) {
      console.log("error", e);
      notification.error("Failed to mint NFT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full text-sm flex space-x-2">
        {!z && (
          <button onClick={handleAuth} className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect Zupass"}
          </button>
        )}
        {z && (
          <button onClick={handleMintNFT} className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Minting..." : "Mint Frog NFT"}
          </button>
        )}
      </div>
    </main>
  );
};

export default ZuAuth;
