import {BigNumber} from "@ethersproject/bignumber";

export interface LiquidityMintEventData {
    sender: string;
    owner: string;
    amount: BigNumber;
}

/// @notice Emitted by the pool for any swaps between token0 and token1
/// @param sender The address that initiated the swap call, and that received the callback
/// @param recipient The address that received the output of the swap
export interface SwapEventData {
    sender: string;
    recipient: string;
}
/// @notice Emitted when a position's liquidity is removed
/// @param owner The owner of the position for which liquidity is removed
/// @param amount The amount of liquidity to remove
/// @param amount0 The amount of token0 withdrawn
/// @param amount1 The amount of token1 withdrawn
export interface BurnEventData {
    owner: string;
    amount: number;
    amount0: number;
    amount1: number;
}