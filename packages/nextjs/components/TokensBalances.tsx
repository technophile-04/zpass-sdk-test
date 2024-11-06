import scaffoldConfig from "~~/scaffold.config";
import { TokenBalance } from "~~/components/TokenBalance";

export const TokensBalances = () => {
  return (
    <div className="rounded-xl">
      <table className="table-auto border-separate ">
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {scaffoldConfig.tokens.map(token => (
            <TokenBalance
              key={token.attribute}
              token={token}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
