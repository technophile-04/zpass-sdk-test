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
        <div className="min-h-screen flex justify-center items-end">
          <div className="pb-6">
            <TokensBalances />
          </div>
        </div>
      )}
    </main>
  );
};

export default Rewards;
