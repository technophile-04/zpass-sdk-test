import { JuiceSlot } from "./JuiceSlot";
import { TTokenInfo } from "~~/types/frog";

export const TokenBalance = ({ token, reward }: { token: TTokenInfo; reward: bigint }) => {
  return <JuiceSlot balance={reward ? reward.toString() : "0"} token={token} />;
};
