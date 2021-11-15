require("dotenv").config();

const requestCreator = require("./utils");
const cfg = require("./config");

async function bootstrap() {
  const request = requestCreator(cfg.API_KEY, cfg.SECRET);
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
