"use client";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

type UserData = {
  id: string;
  totalAmount: bigint;
};

type UsersData = { users: { items: UserData[] } };

const fetchUsersData = async () => {
  const UsersDataQuery = gql`
    query Users {
      users(orderBy: "totalAmount", orderDirection: "desc") {
        items {
          id
          totalAmount
        }
      }
    }
  `;
  const data = await request<UsersData>(
    process.env.NEXT_PUBLIC_PONDER_URL || "http://localhost:42069",
    UsersDataQuery,
  );
  return data;
};

const UsersLeaderboard: NextPage = () => {
  const { data: leaderboard } = useQuery({
    queryKey: ["usersData"],
    queryFn: fetchUsersData,
    refetchInterval: 30000,
  });

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="py-10 px-6">
        <h2 className="text-center text-4xl font-lindenHill tracking-wide">Users Leaderboard</h2>
        {!leaderboard && (
          <div className="flex items-center flex-col flex-grow pt-12">
            <div className="loading loading-dots loading-md"></div>
          </div>
        )}
        {leaderboard && !leaderboard.users.items.length && (
          <div className="flex items-center flex-col flex-grow pt-4">
            <p className="text-center text-xl tracking-wide">No Users Found</p>
          </div>
        )}
        {leaderboard && leaderboard.users.items.length && (
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.users.items.map((user: UserData) => (
                <tr>
                  <td>
                    <Address address={user.id} size="sm" />
                  </td>
                  <td className="text-right">{user.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default UsersLeaderboard;
