import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export function buildMerkle(leaves: Buffer[]) {
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  return {
    root: tree.getHexRoot(),
    tree,
  };
}
