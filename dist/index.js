"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const utils_1 = require("./utils");
const config_1 = __importDefault(require("./config"));
async function bootstrap() {
    const { API_KEY, SECRET } = config_1.default;
    if (!(API_KEY && SECRET))
        throw new Error("no key");
    const request = (0, utils_1.requestCreator)(API_KEY, SECRET);
    try {
        // const result = await request.post("spot_margin/offers", {
        //   params: { coin: "USD", size: 7000, rate: 0.00000228 },
        // });
        const result = await request.get("subaccounts");
        console.log(result.data);
    }
    catch (e) {
        console.error(e);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map