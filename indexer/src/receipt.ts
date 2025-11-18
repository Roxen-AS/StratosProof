import { CONFIG } from './config';
import axios from 'axios';
import { ethers } from 'ethers';


export async function storeReceipt(receipt: any) {
const data = JSON.stringify(receipt);
const res = await axios.post(CONFIG.IPFS_API, data, {
headers: { 'Content-Type': 'application/json' }
});
return res.data;
}