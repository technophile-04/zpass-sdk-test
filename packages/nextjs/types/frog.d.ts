export type TTokenInfo = {
  attribute: string;
  name: string;
  symbol: string;
};

export type SqueezeReward = {
  beauty: string;
  intelligence: string;
  jump: string;
  speed: string;
  rarity: string;
};

export type SqueezeRewardKey = keyof SqueezeReward;
