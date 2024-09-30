"use client";

import { Zapp, connect } from "@parcnet-js/app-connector";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

const myZapp: Zapp = {
  name: "Frog Bank",
};

const ZuAuth = () => {
  const { address: connectedAddress } = useAccount();

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
      const z = await connect(myZapp, element, clientUrl);

      console.log("The z is ", z);

      notification.success("Please check console for more logs");

      const result = await z.gpc.prove({
        pods: {
          FROGCRYPTO: {
            pod: {
              entries: {
                name: { type: "string" },
                description: { type: "string" },
                imageUrl: { type: "string" },
                frogId: { type: "int" },
                biome: { type: "int" },
                rarity: { type: "int" },
                temperament: { type: "int" },
                jump: { type: "int" },
                speed: { type: "int" },
                intelligence: { type: "int" },
                beauty: { type: "int" },
                timestampSigned: { type: "int" },
                owner: { type: "string" },
              },
            },
            revealed: {
              name: true,
              beauty: true,
              rarity: true,
              temperament: true,
              jump: true,
              speed: true,
              intelligence: true,
            },
          },
        },
      });

      console.log("The result is", result);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <div className="z-10 max-w-5xl w-full text-sm">
        <button onClick={handleAuth} className="btn btn-primary">
          Auth
        </button>
      </div>
    </main>
  );
};

export default ZuAuth;
