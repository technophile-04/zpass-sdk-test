import scaffoldConfig from "~~/scaffold.config";
import { SqueezeReward, SqueezeRewardKey } from "~~/types/frog";

export const TokensRewards = ({ rewards }: { rewards: SqueezeReward }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Token</th>
            <th className="text-right">Reward</th>
          </tr>
        </thead>
        <tbody>
          {scaffoldConfig.tokens.map(token => {
            const attribute = token.attribute.toLowerCase() as SqueezeRewardKey;
            return (
              <tr key={token.name}>
                <td>
                  {token.symbol} {token.name}
                </td>
                <td className="text-right">{rewards[attribute]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
