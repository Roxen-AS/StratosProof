import { useState } from "react";
import { getEmitterContract } from "../lib/web3";

export default function SendIntent() {
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  async function sendIntent() {
    try {
      const emitter = await getEmitterContract();
      const tx = await emitter.fireIntent(amount);
      setTxHash(tx.hash);
      await tx.wait();
      alert("Intent sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send intent");
    }
  }

  return (
    <div className="card">
      <h2>Send Intent</h2>
      <input value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={sendIntent}>Send</button>
      {txHash && <p>Tx: {txHash}</p>}
    </div>
  );
}
