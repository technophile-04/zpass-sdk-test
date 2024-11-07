import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  User: p.createTable({
    id: p.hex(),
    squeezeLogs: p.many("SqueezeLog.ownerId"),
    rarityAmount: p.bigint(),
    jumpAmount: p.bigint(),
    speedAmount: p.bigint(),
    intelligenceAmount: p.bigint(),
    beautyAmount: p.bigint(),
    totalAmount: p.bigint(),
    updated: p.int(),
  }),
  SqueezeLog: p.createTable({
    id: p.string(),
    frogId: p.bigint(),
    rarityAmount: p.bigint(),
    jumpAmount: p.bigint(),
    speedAmount: p.bigint(),
    intelligenceAmount: p.bigint(),
    beautyAmount: p.bigint(),
    totalAmount: p.bigint(),
    name: p.string(),
    story: p.string(),
    timestamp: p.int(),
    ownerId: p.hex().references("User.id"),

    owner: p.one("ownerId"),
  }),
}));
