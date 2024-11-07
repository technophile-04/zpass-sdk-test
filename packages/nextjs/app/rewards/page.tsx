"use client";

import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { TokensBalances } from "~~/components/TokensBalances";

const Rewards = () => {
  const { address: connectedAddress } = useAccount();


  if (!connectedAddress) {
    return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <div className="z-10 max-w-5xl w-full flex flex-row gap-8 items-center justify-between">
          <RainbowKitCustomConnectButton />
          <img src="/priest.jpg" width="550" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="z-10 max-w-5xl w-full flex flex-row gap-8 items-center justify-between">
        <div className="flex flex-col space-y-4">
          <div className="card w-full bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-primary">Rewards Balance</h2>
              <div className="divider"></div>
              <TokensBalances />
            </div>
          </div>
        </div>

        <img src="/priest.jpg" width="550" />
      </div>
    </main>
  );
};

export default Rewards;
