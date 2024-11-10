import { JuiceImage } from "./JuiceImage";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { TTokenInfo } from "~~/types/frog";
import { ContractName } from "~~/utils/scaffold-eth/contract";

export const TokenBalance = ({ token }: { token: TTokenInfo }) => {
  const { address: connectedAddress } = useAccount();

  const { data: balance } = useScaffoldReadContract({
    contractName: `FrogCrypto${token.attribute}Token` as ContractName,
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <JuiceImage className="w-20 h-20" name={token.name} symbol={token.symbol} />
        <span className="absolute bottom-2 left-2 text-xs text-white font-semibold shadow-md">
          {balance ? balance.toString() : 0}
        </span>
      </div>
      <p className="m-0 font-lindenHill tracking-wide text-lg text-gray-50">{token.name}</p>
    </div>
  );
};
