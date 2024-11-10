import { JuiceGrid } from "./JuiceGrid";
import { TokenBalance } from "~~/components/TokenBalance";
import scaffoldConfig from "~~/scaffold.config";

export const TokensBalances = () => {
  return (
    <JuiceGrid>
      {scaffoldConfig.tokens.map(token => (
        <TokenBalance key={token.attribute} token={token} />
      ))}
    </JuiceGrid>
  );
};
