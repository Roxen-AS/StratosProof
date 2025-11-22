import { ethers } from "ethers";
import VerifierABI from "../abi/StratosProofVerifier.json";
import EmitterABI from "../abi/IntentEmitter.json";

const RPC = import.meta.env.VITE_RPC;
const VERIFIER = import.meta.env.VITE_VERIFIER_ADDR;
const EMITTER = import.meta.env.VITE_EMITTER_ADDR;

export function getProvider() {
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = await getProvider();
  await provider.send("eth_requestAccounts", []);
  return await provider.getSigner();
}

export async function getEmitterContract() {
  const signer = await getSigner();
  return new ethers.Contract(EMITTER, EmitterABI, signer);
}

export async function getVerifierContract() {
  const provider = new ethers.JsonRpcProvider(RPC);
  return new ethers.Contract(VERIFIER, VerifierABI, provider);
}
