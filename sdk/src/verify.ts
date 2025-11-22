import { ethers } from "ethers";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

/**
 * verifyReceipt()
 * ------------------
 * Verifies:
 *  1. Merkle proof validity (proof matches leaf + root)
 *  2. Root is anchored in the Verifier contract
 *
 * @param receipt - Receipt JSON pulled from IPFS
 * @param verifierAddress - Address of StratosProofVerifier.sol
 * @param provider - ethers provider (RPC)
 */
export async function verifyReceipt(
  receipt: any,
  verifierAddress: string,
  provider: any
) {
  // Convert leaf to buffer
  const leaf = Buffer.from(receipt.digest.replace("0x", ""), "hex");

  // Convert proof to buffers
  const siblings = receipt.proof.map((p: string) =>
    Buffer.from(p.replace("0x", ""), "hex")
  );

  // Build MerkleTree instance (empty tree, only used for verification)
  const tree = new MerkleTree([], keccak256, { sortPairs: true });

  const merkleValid = tree.verify(siblings, leaf, receipt.root);

  // Check on-chain if root is registered
  const verifier = new ethers.Contract(
    verifierAddress,
    ["function isAnchored(bytes32) view returns (bool)"],
    provider
  );

  const anchored = await verifier.isAnchored(receipt.root);

  return merkleValid && anchored;
}
