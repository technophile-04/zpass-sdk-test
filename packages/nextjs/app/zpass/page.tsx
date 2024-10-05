"use client";

import { useState } from "react";
import { FrogSpec } from "@frogcrypto/shared";
import { ParcnetAPI, Zapp, connect } from "@parcnet-js/app-connector";
import { POD } from "@pcd/pod";
import { PartialDeep } from "type-fest";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

// Paste in the array which you get from localstorage
const myForgs = ["entries: {...}"];

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
  owner: {
    type: "cryptographic",
  },
  intelligence: {
    type: "int",
  },
};

const myZapp: Zapp = {
  name: "Frog Bank",
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
      const clientUrl = "https://staging.zupass.org";

      // Connect!
      const zCon = await connect(myZapp, element, clientUrl);
      setZ(zCon);

      console.log("The z is ", zCon);

      notification.success("Please check console for more logs");

      const res = POD.deserialize(myForgs[0]);

      // insert the POD
      await zCon.pod.insert(res);

      console.log("The result is", res);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleProve = async () => {
    try {
      if (!z) return notification.error("Please authenticate first");
      const result = await z.gpc.prove({
        pods: {
          FROGCRYPTO: {
            pod: {
              entries: entriesToProve,
            },
            revealed: {
              name: true,
              owner: true,
              beauty: true,
              rarity: true,
              jump: true,
              speed: true,
              intelligence: true,
            },
          },
        },
      });

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
