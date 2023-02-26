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
    amount0: string;
    amount1: string;
}

/// @notice Emitted when liquidity is minted for a given position
/// @param sender The address that minted the liquidity
/// @param owner The owner of the position and recipient of any minted liquidity
/// @param amount The amount of liquidity minted to the position range
/// @param amount0 How much token0 was required for the minted liquidity
/// @param amount1 How much token1 was required for the minted liquidity
export interface MintEventData {
    sender: string;
    owner: string;
    amount: number;
}