"use client";

import { Leaderboard } from "./components/Leaderboard";
import type { NextPage } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/components/ui/tabs";
import scaffoldConfig from "~~/scaffold.config";

const tokens = scaffoldConfig.tokens;

const tokensWithTotal = [
  ...tokens,
  {
    name: "Total",
    symbol: "Total",
    attribute: "Total",
  },
];

const UsersLeaderboard: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-200">
      <Tabs defaultValue={tokens[0].name}>
        <TabsList className="grid grid-cols-3 w-full">
          {tokensWithTotal.map(token => (
            <TabsTrigger key={token.attribute} value={token.name}>
              {token.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tokensWithTotal.map(token => (
          <TabsContent key={token.attribute} value={token.name}>
            <Leaderboard token={token} />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default UsersLeaderboard;
