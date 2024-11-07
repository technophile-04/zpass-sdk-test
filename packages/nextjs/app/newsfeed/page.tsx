"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

type SqueezeLog = {
  id: string;
  frogId: bigint;
  rarityAmount: bigint;
  jumpAmount: bigint;
  speedAmount: bigint;
  intelligenceAmount: bigint;
  beautyAmount: bigint;
  totalAmount: bigint;
  name: string;
  story: string;
  timestamp: number;
  ownerId: string;
};

type SqueezeLogs = { squeezeLogs: { items: SqueezeLog[] } };

const fetchSqueezeLogs = async () => {
  const SqueezeLogsQuery = gql`
    query SqueezeLogs {
      squeezeLogs(orderBy: "timestamp", orderDirection: "desc") {
        items {
          id
          frogId
          rarityAmount
          jumpAmount
          speedAmount
          intelligenceAmount
          beautyAmount
          totalAmount
          name
          story
          timestamp
          ownerId
        }
      }
    }
  `;
  const data = await request<SqueezeLogs>(
    process.env.NEXT_PUBLIC_PONDER_URL || "http://localhost:42069",
    SqueezeLogsQuery,
  );
  return data;
};

const Newsfeed: NextPage = () => {
  const { data: squeezeLogsData } = useQuery({
    queryKey: ["squeezeLogs"],
    queryFn: fetchSqueezeLogs,
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <h2 className="text-center text-4xl font-bold">Squeezing Rituals</h2>
        {!squeezeLogsData && (
          <div className="flex items-center flex-col flex-grow pt-12">
            <div className="loading loading-dots loading-md"></div>
          </div>
        )}
        {squeezeLogsData && !squeezeLogsData.squeezeLogs.items.length && (
          <div className="flex items-center flex-col flex-grow pt-4">
            <p className="text-center text-xl font-bold">
              No greetings found
            </p>
          </div>
        )}
        {squeezeLogsData && squeezeLogsData.squeezeLogs.items.length && (
          <div className="flex flex-col items-center space-y-8">
            {squeezeLogsData.squeezeLogs.items.map((log: SqueezeLog) => (
              <div key={log.id} className="flex flex-col items-center space-y-4">
                <div className="flex flex-row items-center">
                  <p className="my-2 font-medium">{log.name}</p>
                  <p className="m-0 px-2">from</p>
                  <Address address={log.ownerId} />
                  <p className="m-0 px-2">at</p>
                  <p className="my-2 font-medium">
                    {new Date(log.timestamp * 1000).toLocaleString()}
                  </p>
                </div>
                <div>
                  {log.story}
                </div>
                <div>
                  Rewards:
                  {scaffoldConfig.tokens.map((token) => (
                    <span key={token.attribute} className="ml-2">
                      {log[`${token.attribute.toLowerCase()}Amount` as keyof SqueezeLog]} {token.symbol}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Newsfeed;