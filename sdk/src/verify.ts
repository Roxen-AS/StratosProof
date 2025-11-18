import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";


export async function verifyReceipt(receipt: any, verifierAddress: string, provider: any) {
const digest = Buffer.from(receipt.digest.replace("0x", ""), "hex");
const siblings = receipt.proof.map((p: string) => Buffer.from(p.replace("0x", ""), "hex"));


const tree = new MerkleTree([], keccak256, { sortPairs: true });
const validMerkle = tree.verify(siblings, digest, receipt.root);


const verifier = new ethers.Contract(verifierAddress, ["function isAnchored(bytes32) view returns (bool)"], provider);
const anchored = await verifier.isAnchored(receipt.root);


return validMerkle && anchored;
}