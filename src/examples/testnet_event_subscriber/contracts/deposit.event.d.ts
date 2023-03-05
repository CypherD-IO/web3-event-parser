import { BigNumber } from '@ethersproject/bignumber'
export interface DepositEventData {
    from: string;
    amount: BigNumber;
    new_amount: BigNumber;
}