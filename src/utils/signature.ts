import cryptoJS from "crypto-js";
import { HttpMethod } from "../types";

function signMessage(message: string, secret: string): string {
  return cryptoJS.enc.Hex.stringify(cryptoJS.HmacSHA256(message, secret));
}

function getRequestSignature(
  method: HttpMethod,
  endpoint: string,
  secret: string,
  timestamp: number,
  serialisedParams: string = ""
): string {
  if (!secret) return "";

  const signature_payload = `${timestamp}${method}/api/${endpoint}${serialisedParams}`;
  return signMessage(signature_payload, secret);
}

export { getRequestSignature };
