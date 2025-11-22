// frontend/src/components/VerifyReceipt.tsx
import React, { useState } from "react";
import axios from "axios";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { getVerifierContract } from "../lib/web3";

type Receipt = {
  digest: string;
  root: string;
  proof: string[]; // hex strings
  index: number;
  anchorTx?: string;
  allDigests?: string[]; // IMPORTANT: indexer should include this
};

export default function VerifyReceipt() {
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function onVerify() {
    setStatus(null);
    setDetails(null);

    try {
      setLoading(true);
      const ipfsUrl = cid.startsWith("http") ? cid : `https://ipfs.io/ipfs/${cid}`;
      const res = await axios.get(ipfsUrl);
      const receipt: Receipt = res.data;

      if (!receipt) throw new Error("Receipt not found at CID");

      // Must have allDigests to reconstruct the original Merkle tree
      if (!receipt.allDigests || receipt.allDigests.length === 0) {
        setStatus("INVALID ✗ (receipt missing allDigests - cannot verify)");
        setLoading(false);
        return;
      }

      // Reconstruct leaves as buffers
      const leaves = receipt.allDigests.map((h) =>
        Buffer.from(h.replace(/^0x/, ""), "hex")
      );

      // Build Merkle tree using the same hash function and pair sorting
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

      // Convert receipt.digest into buffer
      const leafBuf = Buffer.from(receipt.digest.replace(/^0x/, ""), "hex");

      // Verify that reconstructed root matches the root in the receipt
      const reconstructedRoot = tree.getHexRoot();
      const rootMatches = reconstructedRoot === receipt.root;

      if (!rootMatches) {
        setStatus("INVALID ✗ (reconstructed root mismatch)");
        setDetails({ reconstructedRoot, receiptRoot: receipt.root });
        setLoading(false);
        return;
      }

      // Verify Merkle proof (merkletreejs verify takes proof array, leaf buffer, root)
      const merkleValid = tree.verify(receipt.proof, leafBuf, receipt.root);

      if (!merkleValid) {
        setStatus("INVALID PROOF ✗");
        setDetails({ merkleValid, receipt });
        setLoading(false);
        return;
      }

      // Check on-chain anchoring using verifier contract
      const verifier = getVerifierContract();
      // call the isAnchored method (matches StratosProofVerifier.sol)
      const anchored: boolean = await verifier.isAnchored(receipt.root);

      if (!anchored) {
        setStatus("ROOT NOT ANCHORED ✗");
        setDetails({ merkleValid, anchored });
        setLoading(false);
        return;
      }

      // All checks passed
      setStatus("VALID ✓");
      setDetails({ merkleValid, anchored: true, receipt });
      setLoading(false);
    } catch (err: any) {
      console.error("Verify error:", err);
      setStatus("ERROR: " + (err?.message || String(err)));
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h3>Verify Receipt</h3>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Enter IPFS CID or URL"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          style={{ padding: 8, minWidth: 260, flex: 1 }}
        />
        <button onClick={onVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {status && <p style={{ marginTop: 12, fontSize: 18 }}>{status}</p>}

      {details && (
        <pre style={{ marginTop: 12, background: "#0f172a", color: "#e6eef8", padding: 12 }}>
          {JSON.stringify(details, null, 2)}
        </pre>
      )}
    </div>
  );
}
