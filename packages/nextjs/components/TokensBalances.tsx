import { TokenBalance } from "~~/components/TokenBalance";
import scaffoldConfig from "~~/scaffold.config";

export const TokensBalances = () => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6">
      {scaffoldConfig.tokens.map(token => (
        <TokenBalance key={token.attribute} token={token} />
      ))}
    </div>
  );
};
