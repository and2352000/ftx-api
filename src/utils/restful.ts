import { URLSearchParams } from "url";
import axios, { AxiosRequestConfig } from "axios";

import { getRequestSignature } from "./signature";
import { getHeader } from "./header";
import { HttpMethod } from "../types";

const baseURL = "https://ftx.com/api";

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

interface Options {
  // subaccount?: string;
  params?: Record<string, number | string>;
}

const restCreator =
  (apiKey: string, secret: string, subaccount?: string) =>
  (method: HttpMethod) =>
  async (path: string, opt: Options = {}) => {
    const { params } = opt;
    
    const timestamp = Date.now();

    const serializeParams = (
      method: HttpMethod,
      params: Record<string, number | string> | string
    ) => {
      if (method === HttpMethod.GET)
        return `?${new URLSearchParams(params as string).toString()}`;

      return JSON.stringify(params);
    };

    const sign = getRequestSignature(
      method,
      path,
      secret,
      timestamp,
      params && serializeParams(method, params)
    );

    const headers = getHeader(timestamp, sign, apiKey, subaccount);

    const reqConfig: AxiosRequestConfig = { url: path, method, headers };

    if (params) {
      if (method === HttpMethod.GET) reqConfig.params = params;
      reqConfig.data = params;
    }

    return await instance.request(reqConfig);
  };

export { restCreator };
