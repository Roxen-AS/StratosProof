import { useState } from 'react';
import TxSender from './components/TxSender';
import VerifyBox from './components/VerifyBox';


export default function App() {
return (
<div style={{ padding: 40, fontFamily: 'sans-serif' }}>
<h1>StratosProof Demo</h1>
<TxSender />
<VerifyBox />
</div>
);
}