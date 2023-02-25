import {BigNumber} from "@ethersproject/bignumber";

export interface LiquidityMintEventData {
    sender: string;
    owner: string;
    amount: BigNumber;
}

export interface SwapEventData {
    sender: string;
    recipient: string;
}