"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeader = void 0;
function getHeader(timestamp, sign, apiKey, subaccount) {
    const headers = {
        "FTX-TS": String(timestamp),
        "FTX-SIGN": sign,
        "FTX-KEY": apiKey,
    };
    if (subaccount)
        headers["FTX-SUBACCOUNT"] = subaccount;
    return headers;
}
exports.getHeader = getHeader;
//# sourceMappingURL=header.js.map