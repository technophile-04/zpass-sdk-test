"use client";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import type { NextPage } from "next";
import { JuiceImage } from "~~/components/JuiceImage";
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
    refetchInterval: 30000,
  });

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="py-10 px-6">
        <h2 className="text-center text-4xl font-lindenHill tracking-wide">Squeezing Rituals</h2>
        {!squeezeLogsData && (
          <div className="flex items-center flex-col flex-grow pt-12">
            <div className="loading loading-dots loading-md"></div>
          </div>
        )}
        {squeezeLogsData && !squeezeLogsData.squeezeLogs.items.length && (
          <div className="flex items-center flex-col flex-grow pt-4">
            <p className="text-center text-xl tracking-wide">No Rituals Found</p>
          </div>
        )}
        {squeezeLogsData && squeezeLogsData.squeezeLogs.items.length && (
          <div className="space-y-6 divide-y divide-gray-300">
            {squeezeLogsData.squeezeLogs.items.map((log: SqueezeLog) => (
              <article key={log.id} className="pt-6 flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={new Date(log.timestamp * 1000).toLocaleString()} className="text-gray-500">
                    {new Date(log.timestamp * 1000).toLocaleString()}
                  </time>
                </div>
                <div className="group relative">
                  <div className="mt-1 flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
                    <h3 className="mt-3 mb-2 text-xl font-lindenHill tracking-wide text-gray-900">{log.name}</h3>
                    <Address address={log.ownerId} size="sm" />
                  </div>
                  <p className="mt-1 line-clamp-3 text-sm/6 text-gray-600">{log.story}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-gray-600 text-sm/6">
                  Rewards:
                  {scaffoldConfig.tokens.map(token => (
                    <span key={token.attribute} className="flex items-center gap-1">
                      <JuiceImage
                        className="rounded-full w-5 h-5"
                        name={token.name}
                        symbol={token.symbol}
                        width={20}
                        height={20}
                      />
                      {log[`${token.attribute.toLowerCase()}Amount` as keyof SqueezeLog]}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Newsfeed;
