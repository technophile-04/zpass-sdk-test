import { TokenBalance } from "~~/components/TokenBalance";
import scaffoldConfig from "~~/scaffold.config";

export const TokensBalances = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="font-lindenHill tracking-wide text-lg text-gray-500">
          <tr>
            <th>Frog Juice</th>
            <th className="text-right">Balance</th>
          </tr>
        </thead>
        <tbody className="font-lindenHill tracking-wide text-lg">
          {scaffoldConfig.tokens.map(token => (
            <TokenBalance key={token.attribute} token={token} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
