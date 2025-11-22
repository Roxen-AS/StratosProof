// indexer/src/index.ts
import "dotenv/config";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import { buildMerkle } from "./merkle";
import { storeReceipt } from "./receipt";
import { CONFIG } from "./config";

import VerifierABI from "./abi/StratosProofVerifier.json";
import EmitterABI from "./abi/IntentEmitter.json";

const provider = new ethers.JsonRpcProvider(CONFIG.RPC);
const wallet = new ethers.Wallet(CONFIG.PRIVATE_KEY, provider);

const verifier = new ethers.Contract(
  CONFIG.VERIFIER,
  (VerifierABI as any).abi ? (VerifierABI as any).abi : VerifierABI,
  wallet
);

const emitter = new ethers.Contract(
  CONFIG.EMITTER,
  (EmitterABI as any).abi ? (EmitterABI as any).abi : EmitterABI,
  provider
);

let pendingDigests: Buffer[] = [];

async function main() {
  console.log("StratosProof Indexer Started...");

  emitter.on("CrossIntent", async (user, amount, id, ts) => {
    try {
      console.log(`Event detected → IntentID: ${id.toString()}`);

      const digest = keccak256(
        Buffer.from(
          JSON.stringify({
            user: user.toString(),
            amount: amount.toString(),
            id: id.toString(),
            ts: ts.toString(),
          })
        )
      );

      pendingDigests.push(digest);

      // You can customize batch size; default currently 3
      if (pendingDigests.length >= 3) {
        console.log("Batch size reached → constructing Merkle tree...");

        const { root, tree } = buildMerkle(pendingDigests);

        // registerRoot expects a bytes32 root - tree.getHexRoot() returns hex
        const tx = await verifier.registerRoot(root);
        await tx.wait();

        console.log("Root anchored on-chain:", root, "anchorTx:", tx.hash);

        // prepare allDigests array (hex strings) for inclusion in each receipt
        const allDigestsHex = pendingDigests.map((d) => `0x${d.toString("hex")}`);

        for (let i = 0; i < pendingDigests.length; i++) {
          const proof = tree.getHexProof(pendingDigests[i]);

          const receipt = {
            digest: `0x${pendingDigests[i].toString("hex")}`,
            root,
            proof,
            index: i,
            anchorTx: tx.hash,
            // IMPORTANT: include the full set of leaves so clients can reconstruct the same Merkle tree
            allDigests: allDigestsHex,
            timestamp: Date.now(),
            emitter: CONFIG.EMITTER,
          };

          const ipfsRes = await storeReceipt(receipt);

          // Some IPFS endpoints return { Hash } or { IpfsHash } etc. log the raw response
          console.log("Receipt uploaded to IPFS response:", ipfsRes);
        }

        // clear batch
        pendingDigests = [];
      }
    } catch (err) {
      console.error("Indexer event handler error:", err);
      // in case of an error, avoid losing pending digests (optional: add retry/backoff)
    }
  });
}

main().catch((e) => {
  console.error("Indexer main error:", e);
  process.exit(1);
});
