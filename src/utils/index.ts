import { restCreator } from "./restful";
import { HttpMethod } from "../types";
import  { AxiosResponse } from "axios";
import {FtxRes, WalletBalances } from './types/ftx'
interface Options {
  params?: Record<string, number | string>;
}

class FtxApi{
  private rest:(method: HttpMethod) => (path: string, opt?: Options) => Promise<AxiosResponse<any, any>>

  constructor(apiKey: string, secret: string, subaccount?: string){
    this.rest = restCreator(apiKey, secret, subaccount);
  }
   private get(path: string, opt?: Options){
    return this.rest(HttpMethod.GET)(path,opt) 
   }
  private post(path: string, opt?: Options){
    return this.rest(HttpMethod.POST)(path,opt) 
   }

  async getWalletBalances(opt?: Options):Promise<FtxRes<WalletBalances>>{
     return (await this.get('wallet/balances', opt)).data;
   };
  async postSpotMarginOffers(opt?: Options):Promise<FtxRes<null>>{
    return (await this.post('spot_margin/offers', opt)).data;
   }

}


export default FtxApi;
