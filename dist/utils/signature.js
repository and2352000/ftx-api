"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestSignature = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
function signMessage(message, secret) {
    return crypto_js_1.default.enc.Hex.stringify(crypto_js_1.default.HmacSHA256(message, secret));
}
function getRequestSignature(method, endpoint, secret, timestamp, serialisedParams = "") {
    if (!secret)
        return "";
    const signature_payload = `${timestamp}${method}/api/${endpoint}${serialisedParams}`;
    return signMessage(signature_payload, secret);
}
exports.getRequestSignature = getRequestSignature;
//# sourceMappingURL=signature.js.map