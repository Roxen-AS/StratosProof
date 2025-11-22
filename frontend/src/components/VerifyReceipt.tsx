import { useState } from "react";
import { getVerifierContract } from "../lib/web3";
import axios from "axios";

export default function VerifyReceipt() {
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");

  async function verify() {
    try {
      const url = `https://ipfs.io/ipfs/${cid}`;
      const receipt = (await axios.get(url)).data;

      const verifier = await getVerifierContract();
      const ok = await verifier.verifyDigest(
        receipt.root,
        receipt.digest,
        receipt.proof,
        receipt.index
      );

      setStatus(ok ? "VALID ✓" : "INVALID ✗");
    } catch (err) {
      console.error(err);
      setStatus("INVALID ✗ (FAIL)");
    }
  }

  return (
    <div className="card">
      <h2>Verify Receipt</h2>
      <input value={cid} onChange={e => setCid(e.target.value)} />
      <button onClick={verify}>Verify</button>
      {status && <p>{status}</p>}
    </div>
  );
}
