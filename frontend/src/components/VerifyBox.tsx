import { useState } from 'react';
import { verifyReceipt } from '../utils/sdk';
import VerifierABI from '../abi/StratosProofVerifier.json';
import { ethers } from 'ethers';


export default function VerifyBox() {
const [cid, setCid] = useState('');
const [result, setResult] = useState<string | null>(null);
const [loading, setLoading] = useState(false);


async function verify() {
try {
setLoading(true);
const res = await fetch(`https://ipfs.io/ipfs/${cid}`);
const receipt = await res.json();


const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC);


const ok = await verifyReceipt(
receipt,
import.meta.env.VITE_VERIFIER_ADDR,
provider
);


setResult(ok ? 'VALID ✓' : 'INVALID ✗');
setLoading(false);
} catch (e) {
console.error(e);
setLoading(false);
}
}


return (
<div>
<h2>Verify Receipt</h2>
<input
type="text"
placeholder="Enter IPFS CID"
value={cid}
onChange={(e) => setCid(e.target.value)}
style={{ padding: 8, marginRight: 10, width: 300 }}
/>
<button onClick={verify} disabled={loading}>
{loading ? 'Verifying...' : 'Verify'}
</button>
{result && <p style={{ marginTop: 10, fontSize: 20 }}>{result}</p>}
</div>
);
}