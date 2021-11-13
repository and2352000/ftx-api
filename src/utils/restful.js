const { URLSearchParams } = require("url");
const axios = require("axios").default;

const { getRequestSignature } = require("./signature");
const getHeader = require("./header");

const baseURL = "https://ftx.com/api";

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

const rest =
  (apiKey, secret) =>
  (method) =>
  async (path, opt = {}) => {
    const { subaccount, params } = opt;

    const serializeParams = (method, params) => {
      if (method === "GET") return `?${new URLSearchParams(params).toString()}`;

      return JSON.stringify(params);
    };

    const { timestamp, sign } = getRequestSignature(
      method,
      path,
      secret,
      params && serializeParams(method, params)
    );

    const headers = getHeader(timestamp, sign, apiKey, subaccount);
    
    const reqConfig = { url: path, method, headers };

    if (params) {
      if (method === "GET") reqConfig.params = params;
      reqConfig.data = params;
    }

    return await instance.request(reqConfig);
  };

module.exports = rest;
