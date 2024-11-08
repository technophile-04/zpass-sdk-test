import scaffoldConfig from "~~/scaffold.config";
import { SqueezeReward, SqueezeRewardKey } from "~~/types/frog";

export const TokensRewards = ({ rewards }: { rewards: SqueezeReward }) => {
  return (
    <div className="rounded-xl">
      <table className="table-auto border-separate ">
        <thead>
          <tr>
            <th>Token</th>
            <th>Reward</th>
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
