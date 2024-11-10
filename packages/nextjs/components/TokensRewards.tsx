import { JuiceImage } from "./JuiceImage";
import scaffoldConfig from "~~/scaffold.config";
import { SqueezeReward, SqueezeRewardKey } from "~~/types/frog";

export const TokensRewards = ({ rewards }: { rewards: SqueezeReward }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="font-lindenHill tracking-wide text-lg text-gray-500">
          <tr>
            <th>Frog Juice</th>
            <th className="text-right">Reward</th>
          </tr>
        </thead>
        <tbody className="font-lindenHill tracking-wide text-lg">
          {scaffoldConfig.tokens.map(token => {
            const attribute = token.attribute.toLowerCase() as SqueezeRewardKey;
            return (
              <tr key={token.name}>
                <td>
                  <div className="flex items-center gap-4">
                    <JuiceImage name={token.name} symbol={token.symbol} /> {token.name}
                  </div>
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
