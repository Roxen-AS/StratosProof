// indexer/src/receipt.ts
import axios from "axios";
import FormData from "form-data";
import { CONFIG } from "./config";

export async function storeReceipt(receipt: any) {
  const form = new FormData();
  // IPFS API expects a "file" field containing the content
  form.append("file", JSON.stringify(receipt), {
    filename: `receipt-${Date.now()}.json`,
    contentType: "application/json",
  });

  const headers = Object.assign({}, form.getHeaders());

  const response = await axios.post(CONFIG.IPFS_API, form, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  // Different IPFS providers return different shapes.
  // Normalized return: if provider returns { Hash } or { Name, Hash } or ipfs.io returns object with 'Hash'
  // For gateways that return a multipart response, you may need to adjust here.
  return response.data;
}
