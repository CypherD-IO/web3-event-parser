import { CHAIN } from "../../shared/chains.enum";
import { BaseEventHandler, ContractDetail, EventNameWithHandler, NotificationDetail, ParsedEventData } from "../../model/baseEventHandler";
import {BurnEventData, LiquidityMintEventData, SwapEventData} from "./events";
import {BigNumber} from "@ethersproject/bignumber";

export class UniswapV3EventHandler extends BaseEventHandler {

    formatUSDCValue(value: BigNumber): string {
        const decimals = 6;
        const divisor = BigNumber.from(10).pow(decimals);
        const humanReadableValue = value.div(divisor);
        return humanReadableValue.toString();
    }

    getEventsToRegister(): EventNameWithHandler[] {
        return [
            {
                eventName: 'IncreaseLiquidity',
                eventHandler: (parsedEventData: ParsedEventData): NotificationDetail[] => {
                    const eventData = parsedEventData.eventData as LiquidityMintEventData;

                    // Can be returning multiple notification message. Or same message to multiple addresses
                    return [
                        {
                            address: eventData.sender, // Wallet address to be notified
                            title: 'Liquidity Increased for your position', // Short title of the event
                            message: `The liquidity was minted by the amount ${this.formatUSDCValue(BigNumber.from(eventData.amount))}`,
                            options: {}
                        },
                        {
                            address: eventData.owner, // Wallet address to be notified
                            title: 'Liquidity Increased for your owned position', // Short title of the event
                            message: `The liquidity was minted by ${eventData.sender} at the amount ${this.formatUSDCValue(BigNumber.from(eventData.amount))}`,
                            options: {}
                        },
                    ]
                }
            },
            {
                eventName: 'SwapEventData',
                eventHandler: (parsedEventData: ParsedEventData): NotificationDetail[] => {
                    const eventData = parsedEventData.eventData as SwapEventData;

                    return [
                        {
                            address: eventData.sender,
                            title: 'Your swap is complete',
                            message: `The swap you triggered has been completed`,
                            options: {}
                        },
                        {
                            address: eventData.recipient,
                            title: 'Swap is complete',
                            message: `You have received tokens from a swap.`,
                            options: {}
                        }
                    ]
                }
            },
            {
                eventName: 'BurnEvent',
                eventHandler: (parsedEventData: ParsedEventData): NotificationDetail[] => {
                    const eventData = parsedEventData.eventData as BurnEventData;

                    return [
                        {
                            address: eventData.owner,
                            title: 'Removed from liquidity position',
                            message: `Your liquidity position has been removed and a total of ${eventData.amount}`,
                            options: {}
                        }
                    ]
                }
            }
        ];
    }

    getContractDetails(): ContractDetail[] {
        return [
            {
                chain: CHAIN.ETHEREUM,
                address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
            }
        ];
    }


}
