"use client";

import { useAccount } from "wagmi";
import { TokensBalances } from "~~/components/TokensBalances";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Rewards = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <main>
        <div
          className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/priest.jpg')`,
          }}
        >
          <div className="z-10 place-content-center place-items-center">
            <RainbowKitCustomConnectButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/priest.jpg')`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 card w-full bg-base-200 rounded-none">
          <div className="p-3">
            <TokensBalances />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rewards;
