import { TokenBalance } from "~~/components/TokenBalance";
import scaffoldConfig from "~~/scaffold.config";

export const TokensBalances = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Token</th>
            <th className="text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {scaffoldConfig.tokens.map(token => (
            <TokenBalance key={token.attribute} token={token} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
