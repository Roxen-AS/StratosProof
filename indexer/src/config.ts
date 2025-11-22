require("dotenv").config();

export const CONFIG = {
  RPC: process.env.RPC!,
  PRIVATE_KEY: process.env.PRIVATE_KEY!,
  VERIFIER: process.env.VERIFIER!,
  EMITTER: process.env.EMITTER!,
  IPFS_API: process.env.IPFS_API!,
};
