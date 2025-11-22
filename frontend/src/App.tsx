import TxSender from "./components/TxSender";
import VerifyBox from "./components/VerifyBox";

export default function App() {
  return (
    <div style={{ padding: 40, maxWidth: 700 }}>
      <h1>StratosProof Demo</h1>

      <p style={{ maxWidth: 600 }}>
        Send a sample intent → Indexer batches & anchors the Merkle root → Fetch
        receipt → Verify cryptographically.
      </p>

      <TxSender />
      <VerifyBox />
    </div>
  );
}
