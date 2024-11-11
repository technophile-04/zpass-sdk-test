import { JuiceGrid } from "./JuiceGrid";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { useAccount } from "wagmi";
import { TokenBalance } from "~~/components/TokenBalance";
import scaffoldConfig from "~~/scaffold.config";

type UserData = {
  rarityAmount: bigint;
  jumpAmount: bigint;
  speedAmount: bigint;
  intelligenceAmount: bigint;
  beautyAmount: bigint;
  totalAmount: bigint;
};

type UserDataResult = { user: UserData };

type UserDataKey = keyof UserData;

export const TokensBalances = () => {
  const { address: connectedAddress } = useAccount();

  const fetchUserData = async () => {
    const UserDataQuery = gql`
      query User($id: String!) {
        user(id: $id) {
          rarityAmount
          jumpAmount
          speedAmount
          intelligenceAmount
          beautyAmount
          totalAmount
        }
      }
    `;
    const data = await request<UserDataResult>(
      process.env.NEXT_PUBLIC_PONDER_URL || "http://localhost:42069",
      UserDataQuery,
      { id: connectedAddress },
    );
    return data;
  };

  const { data: rewards } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    enabled: !!connectedAddress,
  });

  return (
    <JuiceGrid>
      {scaffoldConfig.tokens.map(token => (
        <TokenBalance
          key={token.attribute}
          token={token}
          reward={rewards ? rewards.user[`${token.attribute.toLowerCase()}Amount` as UserDataKey] : 0n}
        />
      ))}
    </JuiceGrid>
  );
};
