import { AxiosRequestHeaders } from "axios";

function getHeader(
  timestamp: number,
  sign: string,
  apiKey: string,
  subaccount?: string
): AxiosRequestHeaders {
  const headers: AxiosRequestHeaders = {
    "FTX-TS": String(timestamp),
    "FTX-SIGN": sign,
    "FTX-KEY": apiKey,
  };

  if (subaccount) headers["FTX-SUBACCOUNT"] = subaccount;

  return headers;
}

export { getHeader };
