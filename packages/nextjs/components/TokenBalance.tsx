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
    <tr>
      <td>
        <div className="flex items-center gap-4">
          <JuiceImage name={token.name} symbol={token.symbol} />
          {token.name}
        </div>
      </td>
      <td className="text-right">{balance ? balance.toString() : 0}</td>
    </tr>
  );
};
