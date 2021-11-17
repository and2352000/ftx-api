"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restCreator = void 0;
const url_1 = require("url");
const axios_1 = __importDefault(require("axios"));
const signature_1 = require("./signature");
const header_1 = require("./header");
const types_1 = require("../types");
const baseURL = "https://ftx.com/api";
const instance = axios_1.default.create({
    baseURL,
    timeout: 5000,
});
const restCreator = (apiKey, secret) => (method) => async (path, opt = {}) => {
    const { subaccount, params } = opt;
    const timestamp = Date.now();
    const serializeParams = (method, params) => {
        if (method === types_1.HttpMethod.GET)
            return `?${new url_1.URLSearchParams(params).toString()}`;
        return JSON.stringify(params);
    };
    const sign = (0, signature_1.getRequestSignature)(method, path, secret, timestamp, params && serializeParams(method, params));
    const headers = (0, header_1.getHeader)(timestamp, sign, apiKey, subaccount);
    const reqConfig = { url: path, method, headers };
    if (params) {
        if (method === types_1.HttpMethod.GET)
            reqConfig.params = params;
        reqConfig.data = params;
    }
    return await instance.request(reqConfig);
};
exports.restCreator = restCreator;
//# sourceMappingURL=restful.js.map