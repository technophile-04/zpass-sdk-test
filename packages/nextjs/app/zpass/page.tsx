"use client";

import { useState } from "react";
import { FrogSpec } from "@frogcrypto/shared";
import { ParcnetAPI, Zapp, connect } from "@parcnet-js/app-connector";
import { gpcPreVerify } from "@pcd/gpc";
import { ProtoPODGPC } from "@pcd/gpcircuits";
import { POD, PODEntries } from "@pcd/pod";
import { PartialDeep } from "type-fest";
import { useAccount, useSignMessage } from "wagmi";
import { getParsedError, notification } from "~~/utils/scaffold-eth";
import { replacer } from "~~/utils/scaffold-eth/common";
import { TokensBalances } from "~~/components/TokensBalances";

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
  description: {
    type: "string",
  },
  temperament: {
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
  const [story, setStory] = useState<string | null>(null);
  const [squeezedFrogName, setSqueezedFrogName] = useState<string | null>(null);

  const { signMessageAsync } = useSignMessage();

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

  const handleSqueeze = async () => {
    try {
      if (!z) return notification.error("Please authenticate first");
      setIsLoading(true);
      setStory(null); // Reset story when starting new squeeze

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
                frogId: true,
                name: true,
                biome: true,
                owner: true,
                intelligence: true,
                rarity: true,
                description: true,
                temperament: true,
              },
            },
          },
        },
      });

      if (result.success) {
        const boundConfig = result.boundConfig;
        console.log("The bound config is:", boundConfig);
        const revealedClaims = result.revealedClaims;
        const circuit = gpcPreVerify(boundConfig, revealedClaims);
        const pubSignals = ProtoPODGPC.makePublicSignals(circuit.circuitPublicInputs, circuit.circuitOutputs);

        console.log("The pubSignals are:", pubSignals);
        const frogStats = revealedClaims.pods.FROGCRYPTO?.entries;
        console.log("The frogStats are:", frogStats);
        const frogName = frogStats?.name.value;

        const beauty = frogStats?.beauty.value as any as bigint;
        const biome = frogStats?.biome.value as any as bigint;
        const intelligence = frogStats?.intelligence.value as any as bigint;
        const jump = frogStats?.jump.value as any as bigint;
        const speed = frogStats?.speed.value as any as bigint;
        const rarity = frogStats?.rarity.value as any as bigint;
        const owner = frogStats?.owner.value as any as bigint;
        const description = frogStats?.description.value as any as string;
        const temperament = frogStats?.temperament.value as any as bigint;
        const frogId = frogStats?.frogId.value as any as bigint;

        notification.info("Squeezing your Frog...");
        const signature = await signMessageAsync({
          message: `I own ${frogName}`,
        });

        // Send data to backend
        const response = await fetch("/api/squeeze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              proof: {
                pi_a: result.proof.pi_a.slice(0, -1),
                pi_b: result.proof.pi_b.slice(0, -1),
                pi_c: result.proof.pi_c.slice(0, -1),
                pubSignals: pubSignals,
              },
              frogStats: {
                beauty: beauty.toString(),
                biome: biome.toString(),
                intelligence: intelligence.toString(),
                jump: jump.toString(),
                speed: speed.toString(),
                rarity: rarity.toString(),
                owner: owner.toString(),
                name: frogName,
                description,
                temperament: temperament.toString(),
                frogId: frogId.toString(),
              },
              signature,
              address: connectedAddress,
            },
            replacer,
          ),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        console.log("The data is", data);
        setStory(data.story);
        setSqueezedFrogName(frogName as string);
        notification.success(`Successfully squeezed Frog: ${frogName}`);
      }
    } catch (e) {
      const errorMessage = getParsedError(e);
      notification.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col gap-8">
        <div className="flex space-x-2">
          {!z && (
            <button onClick={handleAuth} className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect Zupass"}
            </button>
          )}
          {z && (
            <button onClick={handleSqueeze} className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Squeezing..." : "Squeeze Frog"}
            </button>
          )}
        </div>

        {story && squeezedFrogName && (
          <div className="card w-full bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-primary">The Tale of {squeezedFrogName}</h2>
              <div className="divider"></div>
              <p className="text-lg italic leading-relaxed">{story}</p>
            </div>
          </div>
        )}

        <TokensBalances />
      </div>
    </main>
  );
};

export default ZuAuth;
