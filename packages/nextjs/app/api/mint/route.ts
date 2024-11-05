// app/api/mint/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createWalletClient, fallback, http, verifyMessage } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import deployedContracts from "~~/contracts/deployedContracts";
import scaffoldConfig from "~~/scaffold.config";
import { getAlchemyHttpUrl, getParsedError } from "~~/utils/scaffold-eth";

const wallet_private_key = (process.env.WALLET_PRIVATE_KEY ||
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80") as `0x${string}`;

const { targetNetworks } = scaffoldConfig;

const mainNetwork = targetNetworks[0];
const alchemyHttpUrl = getAlchemyHttpUrl(mainNetwork.id);
const rpcFallbacks = alchemyHttpUrl ? [http(alchemyHttpUrl), http()] : [http()];

const walletClient = createWalletClient({
  chain: mainNetwork,
  transport: fallback(rpcFallbacks),
  account: privateKeyToAccount(wallet_private_key),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateFrogStory(frogStats: FrogStats): Promise<string> {
  const prompt = `
Create a short, mystical story (max 4 sentences) about a priest juicing this frog in a magical ritual. Use these attributes in creative ways:

Name: ${frogStats.name}
Beauty: ${frogStats.beauty}/10
Intelligence: ${frogStats.intelligence}/10
Jump: ${frogStats.jump}/10
Speed: ${frogStats.speed}/10
Rarity: ${frogStats.rarity}/10
Biome: ${frogStats.biome}

Description: ${frogStats.description}
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0].message.content || "Failed to generate story";
  } catch (error) {
    console.error("Error generating story:", error);
    return "In a mystical ceremony, a priest encountered this remarkable frog.";
  }
}

type ProofData = {
  pi_a: string[];
  pi_b: string[][]; // Array of arrays for pi_b
  pi_c: string[];
  pubSignals: string[];
};

type FrogStats = {
  beauty: string;
  biome: string;
  intelligence: string;
  jump: string;
  speed: string;
  rarity: string;
  owner: string;
  name: string;
  description: string;
};

type MintRequestBody = {
  proof: ProofData;
  frogStats: FrogStats;
  signature: string;
  address: string;
};

// Utility function to convert string arrays to BigInt arrays
const convertToBigIntArray = (arr: string[]): bigint[] => {
  return arr.map(str => BigInt(str));
};

// Utility function to convert nested string arrays to nested BigInt arrays
const convertToBigIntNestedArray = (arr: string[][]): bigint[][] => {
  return arr.map(subArr => subArr.map(str => BigInt(str)));
};

// Utility function to convert frog stats to BigInt
const convertFrogStatsToBigInt = (stats: Omit<FrogStats, "description">) => {
  return {
    beauty: BigInt(stats.beauty),
    biome: BigInt(stats.biome),
    intelligence: BigInt(stats.intelligence),
    jump: BigInt(stats.jump),
    speed: BigInt(stats.speed),
    rarity: BigInt(stats.rarity),
    owner: BigInt(stats.owner),
    name: stats.name, // Keep as string
  };
};

// Utility function to convert proof data to BigInt
const convertProofToBigInt = (proof: ProofData) => {
  return {
    pi_a: convertToBigIntArray(proof.pi_a),
    pi_b: convertToBigIntNestedArray(proof.pi_b), // Using nested array conversion for pi_b
    pi_c: convertToBigIntArray(proof.pi_c),
    pubSignals: convertToBigIntArray(proof.pubSignals),
  };
};

export async function POST(req: Request) {
  try {
    const body: MintRequestBody = await req.json();

    // Convert string values to BigInt
    const convertedProof = convertProofToBigInt(body.proof);
    const { description, ...actualStats } = body.frogStats;
    const convertedFrogStats = convertFrogStatsToBigInt(actualStats);

    // Verify signature
    const isValidSignature = await verifyMessage({
      message: `I own ${body.frogStats.name}`,
      signature: body.signature as `0x${string}`,
      address: body.address as `0x${string}`,
    });

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log("The description values are: ", description);

    const { address: contractAddress, abi: contractAbi } = deployedContracts[mainNetwork.id].YourContract;
    const hash = await walletClient.writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "mintFrog",
      args: [
        {
          _pA: convertedProof.pi_a as any,
          _pB: convertedProof.pi_b as any,
          _pC: convertedProof.pi_c as any,
          _pubSignals: convertedProof.pubSignals as any,
        },
        {
          beauty: convertedFrogStats.beauty,
          biome: convertedFrogStats.biome,
          intelligence: convertedFrogStats.intelligence,
          jump: convertedFrogStats.jump,
          speed: convertedFrogStats.speed,
          rarity: convertedFrogStats.rarity,
          owner: convertedFrogStats.owner,
        },
      ],
    });

    const story = await generateFrogStory({
      ...body.frogStats,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "NFT minted successfully",
        txHash: hash,
        story,
      },
      { status: 200 },
    );
  } catch (error) {
    const parsedErrorMessage = getParsedError(error);
    console.error(error);
    return NextResponse.json({ error: parsedErrorMessage }, { status: 500 });
  }
}
