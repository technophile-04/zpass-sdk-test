"use client";

import { Leaderboard } from "./components/Leaderboard";
import type { NextPage } from "next";
import scaffoldConfig from "~~/scaffold.config";

const tokens = scaffoldConfig.tokens;

tokens.push({
  name: "Total",
  symbol: "Total",
  attribute: "Total",
});

const UsersLeaderboard: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-200">
      {tokens.map(token => (
        <Leaderboard key={token.name} token={token} />
      ))}
    </main>
  );
};

export default UsersLeaderboard;
