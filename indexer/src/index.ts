import { ethers } from 'ethers';
import keccak256 from 'keccak256';
import { buildMerkle } from './merkle';
import { storeReceipt } from './receipt';
import { CONFIG } from './config';
import VerifierABI from './abi/StratosProofVerifier.json';
import EmitterABI from './abi/IntentEmitter.json';


const provider = new ethers.JsonRpcProvider(CONFIG.RPC);
const wallet = new ethers.Wallet(CONFIG.PRIVATE_KEY, provider);
const verifier = new ethers.Contract(CONFIG.VERIFIER, VerifierABI, wallet);
const emitter = new ethers.Contract(CONFIG.EMITTER, EmitterABI, provider);


let pendingDigests: Buffer[] = [];


async function main() {
console.log("Indexer started...");


emitter.on("CrossIntent", async (user, amount, id, ts, event) => {
console.log("Event captured:", id.toString());


const digest = keccak256(
Buffer.from(JSON.stringify({
user,
amount: amount.toString(),
id: id.toString(),
ts: ts.toString(),
}))
);


pendingDigests.push(digest);


if (pendingDigests.length >= 3) {
const { root, tree } = buildMerkle(pendingDigests);


const tx = await verifier.registerRoot(root);
await tx.wait();
console.log("Root anchored:", root);


for (let i = 0; i < pendingDigests.length; i++) {
const proof = tree.getHexProof(pendingDigests[i]);


const receipt = {
digest: `0x${pendingDigests[i].toString('hex')}`,
root,
proof,
index: i,
anchorTx: tx.hash,
};


await storeReceipt(receipt);
}


pendingDigests = [];
}
});
}


main();