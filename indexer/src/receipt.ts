import axios from "axios";
import { CONFIG } from "./config";

export async function storeReceipt(receipt: any) {
  const response = await axios.post(
    CONFIG.IPFS_API,
    JSON.stringify(receipt),
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  return response.data;
}
