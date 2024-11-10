import { TTokenInfo } from "./types/frog";

export type TokensConfig = TTokenInfo[];

const tokensConfig = [
  {
    attribute: "Rarity",
    name: "Wispbloom",
    symbol: "rarity",
  },
  {
    attribute: "Jump",
    name: "Brightroot",
    symbol: "jump",
  },
  {
    attribute: "Speed",
    name: "Sparkshade",
    symbol: "speed",
  },
  {
    attribute: "Intelligence",
    name: "Mindflare",
    symbol: "intelligence",
  },
  {
    attribute: "Beauty",
    name: "Sageglow",
    symbol: "beauty",
  },
] satisfies TokensConfig;

export default tokensConfig;
