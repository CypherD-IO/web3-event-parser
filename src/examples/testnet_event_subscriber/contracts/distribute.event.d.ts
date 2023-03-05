import { BigNumber } from '@ethersproject/bignumber'
export interface DistributeEventData {
    to: string;
    amount: BigNumber;
    w3p_value: BigNumber;
    source_value: BigNumber;
}