const getHeaderKey = (headerId, domain = "ftxcom") => {
  if (domain === "ftxcom") {
    switch (headerId) {
      case "key":
        return "FTX-KEY";
      case "ts":
        return "FTX-TS";
      case "sign":
        return "FTX-SIGN";
      case "subaccount":
        return "FTX-SUBACCOUNT";
    }
  }

  if (domain === "ftxus") {
    switch (headerId) {
      case "key":
        return "FTXUS-KEY";
      case "ts":
        return "FTXUS-TS";
      case "sign":
        return "FTXUS-SIGN";
      case "subaccount":
        return "FTXUS-SUBACCOUNT";
    }
  }
};

function getHeader(timestamp, sign, apiKey, subaccount) {
  const headers = {};
  headers[getHeaderKey("ts")] = String(timestamp);
  headers[getHeaderKey("sign")] = sign;
  headers[getHeaderKey("key")] = apiKey;
  if (subaccount) headers[getHeaderKey("subaccount")] = subaccount;
  return headers;
}

module.exports = getHeader;
