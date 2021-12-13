require("dotenv").config();

import FtxApi from "./utils";
import cfg from "./config";

async function bootstrap() {
  const { API_KEY, SECRET } = cfg;
  const lendingRate = 0.000002;
  const apr = lendingRate*365*24;
  if (!(API_KEY && SECRET)) throw new Error("no key");
  const request = new FtxApi(API_KEY, SECRET, 'cash');
  try {

    const balanceRes = await request.getWalletBalances();
    const usd = balanceRes?.result?.find((e)=>e.coin==='USD')
    if(usd?.total){
      console.log('No USD to lend')
      return;
    }
    const lendingOfferRes = await request.postSpotMarginOffers({
      params: { coin: "USD", size: usd!.total, rate: lendingRate },
    });
    if(lendingOfferRes.success) {
      console.log(`${Date.now()} lending USD ${usd?.availableWithoutBorrow} Rate:${apr} success`);
      return;
    }
    
    
  } catch (e) {
    console.error(e);
  }
}

setInterval(bootstrap, 1* 60* 60 *1000); // hour
