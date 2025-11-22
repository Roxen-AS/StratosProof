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
  VerifierABI,
  wallet
);

const emitter = new ethers.Contract(
  CONFIG.EMITTER,
  EmitterABI,
  provider
);

let pendingDigests: Buffer[] = [];

async function main() {
  console.log("StratosProof Indexer Started...");

  emitter.on("CrossIntent", async (user, amount, id, ts) => {
    console.log(`Event detected → IntentID: ${id.toString()}`);

    const digest = keccak256(
      Buffer.from(
        JSON.stringify({
          user,
          amount: amount.toString(),
          id: id.toString(),
          ts: ts.toString(),
        })
      )
    );

    pendingDigests.push(digest);

    if (pendingDigests.length >= 3) {
      console.log("Batch size reached → constructing Merkle tree...");

      const { root, tree } = buildMerkle(pendingDigests);

      const tx = await verifier.registerRoot(root);
      await tx.wait();

      console.log("Root anchored on-chain:", root);

      for (let i = 0; i < pendingDigests.length; i++) {
        const proof = tree.getHexProof(pendingDigests[i]);

        const receipt = {
          digest: `0x${pendingDigests[i].toString("hex")}`,
          root,
          proof,
          index: i,
          anchorTx: tx.hash,
        };

        await storeReceipt(receipt);

        console.log("Receipt stored:", receipt.digest);
      }

      pendingDigests = [];
    }
  });
}

main();
