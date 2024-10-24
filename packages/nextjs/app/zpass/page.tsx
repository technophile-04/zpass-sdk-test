"use client";

import { useState } from "react";
import { FrogSpec } from "@frogcrypto/shared";
import { ParcnetAPI, Zapp, connect } from "@parcnet-js/app-connector";
import { gpcPreVerify } from "@pcd/gpc";
import { POD, PODEntries } from "@pcd/pod";
import { BABY_JUB_PRIME } from "@pcd/util";
import { PartialDeep } from "type-fest";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

export function zeroResidueMod(x: any, n: bigint): bigint {
  const xAsBigint: bigint = typeof x === "string" ? BigInt(x) : x;

  return (n + (xAsBigint % n)) % n;
}

export function makePublicSignals(inputs: any, outputs: any): bigint[] {
  return [
    ...outputs.entryRevealedValueHash,
    ...outputs.virtualEntryRevealedValueHash,
    ...outputs.ownerV3RevealedNullifierHash,
    ...outputs.ownerV4RevealedNullifierHash,
    ...inputs.entryObjectIndex,
    ...inputs.entryNameHash,
    inputs.entryIsValueHashRevealed,
    inputs.virtualEntryIsValueHashRevealed,
    ...inputs.entryEqualToOtherEntryByIndex,
    inputs.entryIsEqualToOtherEntry,
    inputs.ownerExternalNullifier,
    ...inputs.ownerV3EntryIndex,
    ...inputs.ownerV3IsNullifierHashRevealed,
    ...inputs.ownerV4EntryIndex,
    ...inputs.ownerV4IsNullifierHashRevealed,
    ...inputs.numericValueEntryIndices,
    inputs.numericValueInRange,
    ...inputs.numericMinValues.map((value: any) => zeroResidueMod(value, BABY_JUB_PRIME)),
    ...inputs.numericMaxValues.map((value: any) => zeroResidueMod(value, BABY_JUB_PRIME)),
    ...inputs.entryInequalityValueIndex,
    ...inputs.entryInequalityOtherValueIndex,
    inputs.entryInequalityIsLessThan,
    ...inputs.tupleIndices.flat(),
    ...inputs.listComparisonValueIndex,
    inputs.listContainsComparisonValue,
    ...inputs.listValidValues.flat(),
    inputs.requireUniqueContentIDs,
    inputs.globalWatermark,
  ].map(BigInt);
}

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

// TODO: Dynamically load the auth button

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

const myZapp: Zapp = {
  name: "Frog Bank",
  permissions: {
    READ_POD: { collections: ["FROGCRYPTO"] },
    INSERT_POD: { collections: ["FROGCRYPTO"] },
    REQUEST_PROOF: { collections: ["FROGCRYPTO"] },
  },
};

const ZuAuth = () => {
  const { address: connectedAddress } = useAccount();
  const [z, setZ] = useState<ParcnetAPI | null>(null);

  const handleAuth = async () => {
    try {
      if (!connectedAddress) return notification.error("Please connect your address");

      const element = document.getElementById("zpass-app-connector") as HTMLElement;

      if (!element) {
        console.log("Enable to find app connector element");
        notification.error("Oops! Something went wrong");
        return;
      }

      console.log("The element was found", element);
      // The URL to Zupass
      const clientUrl = "https://zupass.org";

      // Connect!
      const zCon = await connect(myZapp, element, clientUrl);
      setZ(zCon);

      notification.success("Please check console for more logs");
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleProve = async () => {
    try {
      if (!z) return notification.error("Please authenticate first");
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

        const circuit = gpcPreVerify(boundConfig, revealedClaims);
        const pubSignals = makePublicSignals(circuit.circuitPublicInputs, circuit.circuitOutputs);
        console.log("The public signals", pubSignals);
      }

      console.log("The result after the insert", result);
    } catch (e) {
      console.log("error", e);
      notification.error("Oops! Something went wrong");
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <div className="z-10 max-w-5xl w-full text-sm flex space-x-2">
        <button onClick={handleAuth} className="btn btn-primary">
          Auth
        </button>
        <button onClick={handleProve} className="btn btn-primary">
          Prove
        </button>
      </div>
    </main>
  );
};

export default ZuAuth;
