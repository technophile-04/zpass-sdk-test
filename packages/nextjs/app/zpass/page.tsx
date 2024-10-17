"use client";

import { useState } from "react";
import { FrogSpec } from "@frogcrypto/shared";
import { ParcnetAPI, Zapp, connect } from "@parcnet-js/app-connector";
import { checkCircuitRequirements, checkVerifyArgs, compileVerifyConfig } from "@pcd/gpc";
import { POD, PODEntries } from "@pcd/pod";
import { BABY_JUB_PRIME } from "@pcd/util";
import { PartialDeep } from "type-fest";
import { useAccount } from "wagmi";
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

// TODO: Dynamically load the auth button

// Paste in the array which you get from localstorage
const myForgs = [
  '{"entries":{"beauty":{"type":"int","value":3},"biome":{"type":"int","value":3},"description":{"type":"string","value":"Budgett\'s frog, named after British zoologist Samuel Budgett, is a peculiar frog species found in South America, particularly in Bolivia and Paraguay. Known for its flattened body, large mouth, and unique appearance, these frogs are often referred to as \\"Paraguay horned frogs\\" due to the horn-like projections on their eyelids."},"frogId":{"type":"int","value":10},"imageUrl":{"type":"string","value":"https://api.zupass.org/frogcrypto/images/aab6a86e-c221-498b-93f5-6698b2460758"},"intelligence":{"type":"int","value":2},"jump":{"type":"int","value":2},"name":{"type":"string","value":"Budgett’s Frog"},"owner":{"type":"cryptographic","value":12852925319729641999035405058143180711193362280307061770953886437131071874429},"pod_type":{"type":"string","value":"frogcrypto.frog"},"rarity":{"type":"int","value":1},"speed":{"type":"int","value":3},"temperament":{"type":"int","value":11},"timestampSigned":{"type":"int","value":1729053876982}},"signature":"LrmwvwA5dsOxIKkkIrNQINeRCIxUb6JuuJVZYrReVypLyZPfEqFr8jKMuNiWNhCvzjxCp/UlziMTw/tzQ5NZBA","signerPublicKey":"ExWVEuffSaNfNCBvMuY/Lfolof7MTEWKcoQetGz81qg"}',
  '{"entries":{"beauty":{"type":"int","value":6},"biome":{"type":"int","value":3},"description":{"type":"string","value":"The Blue Poison Dart Frog\'s vivid blue skin contains potent alkaloid toxins, which are derived from the insects they consume in the wild and serve as a defense mechanism against predators. Indigenous people of Central and South America have utilized these toxins to poison the tips of blowdarts, a traditional method of hunting small game, giving the frog its \\"dart frog\\" name."},"frogId":{"type":"int","value":24},"imageUrl":{"type":"string","value":"https://api.zupass.org/frogcrypto/images/84155a67-7004-45a6-b4b4-88ecf82aa685"},"intelligence":{"type":"int","value":6},"jump":{"type":"int","value":7},"name":{"type":"string","value":"Blue Poison Dart Frog"},"owner":{"type":"cryptographic","value":12852925319729641999035405058143180711193362280307061770953886437131071874429},"pod_type":{"type":"string","value":"frogcrypto.frog"},"rarity":{"type":"int","value":1},"speed":{"type":"int","value":4},"temperament":{"type":"int","value":2},"timestampSigned":{"type":"int","value":1729053860247}},"signature":"kc1vTPbPfkIM6aBSjQvjO1QZPMziozStUW3/wqFZ+BdWYxdiebe5MSHt5wnxTC+fQQXHhkJF8s/hl2qUUFk/AQ","signerPublicKey":"ExWVEuffSaNfNCBvMuY/Lfolof7MTEWKcoQetGz81qg"}',
  '{"entries":{"beauty":{"type":"int","value":0},"biome":{"type":"int","value":3},"description":{"type":"string","value":"Mimic Poison Frogs, despite their name and resemblance to other poisonous dart frogs, are not necessarily toxic themselves. Their bright coloration and mimicry of toxic species are primarily a form of Batesian mimicry, meant to discourage potential predators. "},"frogId":{"type":"int","value":27},"imageUrl":{"type":"string","value":"https://api.zupass.org/frogcrypto/images/3359f796-b26b-4fe0-a24d-0430317dc311"},"intelligence":{"type":"int","value":0},"jump":{"type":"int","value":3},"name":{"type":"string","value":"Mimic Poison Frog"},"owner":{"type":"cryptographic","value":12852925319729641999035405058143180711193362280307061770953886437131071874429},"pod_type":{"type":"string","value":"frogcrypto.frog"},"rarity":{"type":"int","value":1},"speed":{"type":"int","value":6},"temperament":{"type":"int","value":2},"timestampSigned":{"type":"int","value":1729053852350}},"signature":"BekDHnoEJbp8tz7Q1fi6d65rKSJuaLaEQFlNwQh+SKEuRT9W/5zN3gMDgormQp96li0RQQkAMziv9EMMlGFaAQ","signerPublicKey":"ExWVEuffSaNfNCBvMuY/Lfolof7MTEWKcoQetGz81qg"}',
  '{"entries":{"beauty":{"type":"int","value":7},"biome":{"type":"int","value":3},"description":{"type":"string","value":"Paedophryne amauensis holds the title of the world\'s smallest vertebrate, with adults measuring only about 7.7 millimeters in length. These frogs inhabit the leaf litter of the rainforests in Papua New Guinea, where they primarily feed on tiny arthropods and remain well-camouflaged among the forest floor debris."},"frogId":{"type":"int","value":26},"imageUrl":{"type":"string","value":"https://api.zupass.org/frogcrypto/images/fab1ba2d-f81d-4591-8d54-0b4e38dd5285"},"intelligence":{"type":"int","value":4},"jump":{"type":"int","value":7},"name":{"type":"string","value":"Paedophryne Amauensis"},"owner":{"type":"cryptographic","value":12852925319729641999035405058143180711193362280307061770953886437131071874429},"pod_type":{"type":"string","value":"frogcrypto.frog"},"rarity":{"type":"int","value":1},"speed":{"type":"int","value":0},"temperament":{"type":"int","value":4},"timestampSigned":{"type":"int","value":1729053843620}},"signature":"P3Ka495X3rvKDbVHjeodYGTiNBRR6UX8AI8XlHT7II/YIZLXS605uxXUxGi4FFBc2c6ZuDNBW+8scL2J7j6aAw","signerPublicKey":"ExWVEuffSaNfNCBvMuY/Lfolof7MTEWKcoQetGz81qg"}',
];

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

      const res = POD.deserialize(myForgs[0]);
      console.log("the resulit is", res);
      const podData = podToPODData(res);

      // insert the POD
      await zCon.pod.collection("FROGCRYPTO").insert(podData);

      notification.success("Please check console for more logs");

      console.log("The result is", res);
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
              },
            },
          },
        },
      });

      if (result.success) {
        const { boundConfig, revealedClaims } = result;
        console.log("The bound config", boundConfig);
        const circuitReq = checkVerifyArgs(boundConfig, revealedClaims);
        const circuitDesc = checkCircuitRequirements(circuitReq, boundConfig.circuitIdentifier);

        const { circuitPublicInputs, circuitOutputs } = compileVerifyConfig(boundConfig, revealedClaims, circuitDesc);

        const pubSignals = makePublicSignals(circuitPublicInputs, circuitOutputs);
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
