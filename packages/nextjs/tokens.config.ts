import { TTokenInfo } from "./types/frog";

export type TokensConfig = TTokenInfo[];

const tokensConfig = [
{
  attribute: "Rarity",
  name: "Mystic Relic",
  symbol: "🔮",
},
{
  attribute: "Jump",
  name: "Skybound Crest",
  symbol: "🌌",
},
{
  attribute: "Speed",
  name: "Zephyr Token",
  symbol: "🍃",
},
{
  attribute: "Intelligence",
  name: "Sage's Sigil",
  symbol: "🧠",
},
{
  attribute: "Beauty",
  name: "Enchantress' Tear",
  symbol: "🌺",
}
] satisfies TokensConfig;

export default tokensConfig;