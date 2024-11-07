import React from "react";
import scaffoldConfig from "~~/scaffold.config";
import { SqueezeReward } from "~~/types/frog";

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
          {scaffoldConfig.tokens.map(token => (
            <tr>
              <td>{token.symbol} {token.name}</td>
              <td className="text-right">{rewards[token.attribute.toLowerCase()]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
