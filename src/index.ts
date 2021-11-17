require("dotenv").config();

import { requestCreator } from "./utils";
import cfg from "./config";

async function bootstrap() {
  const { API_KEY, SECRET } = cfg;
  if (!(API_KEY && SECRET)) throw new Error("no key");
  const request = requestCreator(API_KEY, SECRET);
  try {
    // const result = await request.post("spot_margin/offers", {
    //   params: { coin: "USD", size: 7000, rate: 0.00000228 },
    // });
    const result = await request.get("subaccounts");
    console.log(result.data);
  } catch (e) {
    console.error(e);
  }
}

bootstrap();
