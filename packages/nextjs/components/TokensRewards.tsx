import { JuiceGrid } from "./JuiceGrid";
import { JuiceSlot } from "./JuiceSlot";
import scaffoldConfig from "~~/scaffold.config";
import { SqueezeReward, SqueezeRewardKey } from "~~/types/frog";

export const TokensRewards = ({ rewards }: { rewards: SqueezeReward }) => {
  return (
    <JuiceGrid>
      {scaffoldConfig.tokens.map(token => {
        const attribute = token.attribute.toLowerCase() as SqueezeRewardKey;
        return <JuiceSlot key={token.name} token={token} balance={rewards[attribute]} />;
      })}
    </JuiceGrid>
  );
};
