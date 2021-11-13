const hmacSHA256 = require("crypto-js/hmac-sha256");
const cryptoJS = require("crypto-js");

function signMessage(message, secret) {
  return cryptoJS.enc.Hex.stringify(hmacSHA256(message, secret));
}

function getRequestSignature(method, endpoint, secret, serialisedParams = "") {
  const timestamp = Date.now() + (this.timeOffset || 0);
  if (!secret) {
    return {
      timestamp,
      sign: "",
    };
  }

  const signature_payload = `${timestamp}${method}/api/${endpoint}${serialisedParams}`;

  return {
    timestamp,
    sign: signMessage(signature_payload, secret),
  };
}

module.exports = { getRequestSignature };
