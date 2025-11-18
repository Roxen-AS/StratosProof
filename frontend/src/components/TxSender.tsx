import { useState } from 'react';
import { ethers } from 'ethers';
import EmitterABI from '../abi/IntentEmitter.json';


export default function TxSender() {
const [amount, setAmount] = useState('');
const [txHash, setTxHash] = useState('');
const [loading, setLoading] = useState(false);


async function sendIntent() {
try {
setLoading(true);
const provider = new ethers.BrowserProvider((window as any).ethereum);
const signer = await provider.getSigner();


const emitter = new ethers.Contract(
import.meta.env.VITE_EMITTER_ADDR,
EmitterABI,
signer
);


const tx = await emitter.fireIntent(ethers.parseEther(amount || '0'));
setTxHash(tx.hash);
await tx.wait();
setLoading(false);
} catch (e) {
console.error(e);
setLoading(false);
}
}


return (
<div style={{ marginBottom: 40 }}>
<h2>Send Cross Intent</h2>
<input
type="number"
placeholder="Amount"
value={amount}
onChange={(e) => setAmount(e.target.value)}
style={{ padding: 8, marginRight: 10 }}
/>
<button onClick={sendIntent} disabled={loading}>
{loading ? 'Sending...' : 'Send Intent'}
</button>
{txHash && (
<p>Tx Hash: <a href={`https://sepolia.arbiscan.io/tx/${txHash}`} target="_blank">{txHash}</a></p>
)}
</div>
);
}