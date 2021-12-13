export interface WalletBalances{
    coin: string,
    total:number,
    free: number,
    availableWithoutBorrow: number,
    usdValue: number,
    spotBorrow: number,
}

export interface FtxRes<T>{
    success: boolean;
    result: T[];
} 