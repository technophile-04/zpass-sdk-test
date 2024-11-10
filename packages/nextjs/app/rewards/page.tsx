"use client";

import { useAccount } from "wagmi";
import { ConnectButtonLayout } from "~~/components/ConnectButtonLayout";
import { TokensBalances } from "~~/components/TokensBalances";

const Rewards = () => {
  const { isConnected } = useAccount();

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/priest.jpg')`,
      }}
    >
      {!isConnected && <ConnectButtonLayout />}
      {isConnected && (
        <div className="min-h-screen flex justify-center items-center">
          <div className="mt-[20rem] p-4 sm:p-6 bg-stone-700 border-4 border-stone-800 rounded-2xl shadow-inner">
            <TokensBalances />
          </div>
        </div>
      )}
    </main>
  );
};

export default Rewards;
