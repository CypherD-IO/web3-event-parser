import { CHAIN } from "../../shared/chains.enum";
import { BaseEventHandler, ContractDetail, EventNameWithHandler, NotificationDetail, ParsedEventData } from "../../model/baseEventHandler";
import {BurnEventData, LiquidityMintEventData, MintEventData, SwapEventData} from "./events";
import {BigNumber} from "@ethersproject/bignumber";
import {BN} from "bn.js";

export class UniswapV3EventHandler extends BaseEventHandler {

    formatUSDCValue(value: BigNumber): string {
        const decimals = 6;
        const divisor = BigNumber.from(10).pow(decimals);
        const humanReadableValue = value.div(divisor);
        return humanReadableValue.toString();
    }

    formatUint128(value: number): string {
        // const decimals = 39;
        // const divisor = BigNumber.from(10).pow(decimals);
        // const humanReadableValue = value.div(divisor);
        return (value / 10^18).toString();
    }

    getEventsToRegister(): EventNameWithHandler[] {
        return [
            // {
            //     eventName: 'IncreaseLiquidity',
            //     eventHandler: (parsedEventData: ParsedEventData): NotificationDetail[] => {
            //         const eventData = parsedEventData.eventData as LiquidityMintEventData;
            //
            //         // Can be returning multiple notification message. Or same message to multiple addresses
            //         return [
            //             {
            //                 address: eventData.sender, // Wallet address to be notified
            //                 title: 'Liquidity Increased for your position', // Short title of the event
            //                 message: `The liquidity was minted by the amount ${this.formatUSDCValue(BigNumber.from(eventData.amount))}`,
            //                 options: {}
            //             },
            //             {
            //                 address: eventData.owner, // Wallet address to be notified
            //                 title: 'Liquidity Increased for your owned position', // Short title of the event
            //                 message: `The liquidity was minted by ${eventData.sender} at the amount ${this.formatUSDCValue(BigNumber.from(eventData.amount))}`,
            //                 options: {}
            //             },
            //         ]
            //     }
            // },
            {
                eventName: 'SwapEventData',
                eventHandler: (parsedEventData: ParsedEventData): NotificationDetail[] => {
                    const eventData = parsedEventData.eventData as SwapEventData;

                    if (eventData.sender === eventData.recipient){
                        return [
                            {
                                address: eventData.recipient,
                                title: 'Your swap is complete',
                                message: `The swap you initiated has been completed. Open wallet to see more details.`,
                                options: {}
                            }
                        ]
                    }

                    return [
                        {
                            address: eventData.sender,
                            title: 'Your swap is complete',
                            message: `The swap you initiated has been completed`,
                            options: {}
                        },
                        {
                            address: eventData.recipient,
                            title: 'Received Swapped Tokens',
                            message: `You have received tokens from a swap initiated by ${eventData.sender}. Open wallet for more details.`,
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
                            message: `Your liquidity position has been removed and a total of ${eventData.amount / parseFloat("1000000000000000")} has been returned.`,
                            options: {}
                        }
                    ]
                }
            },
            {
                eventName: 'MintEvent',
                eventHandler: (parsedEventData: ParsedEventData): NotificationDetail[] => {
                    const eventData = parsedEventData.eventData as MintEventData;
                    if (eventData.owner === eventData.sender){
                        return [
                            {
                                address: eventData.owner,
                                title: 'Liquidity Minted',
                                message: `Your liquidity of the amount ${eventData.amount / parseFloat("1000000000000000")} has been minted`,
                                options: {}
                            }
                        ]
                    }
                    else{
                        return [
                            {
                                address: eventData.owner,
                                title: 'Liquidity minted for you',
                                message: `${eventData.sender} minted liquidity for you and a total of ${eventData.amount / parseFloat("1000000000000000")}`,
                                options: {}
                            }
                        ]
                    }
                }
            }
        ];
    }

    getContractDetails(): ContractDetail[] {
        return [
            {
                chain: CHAIN.ETHEREUM,
                address: '0x6c6bc977e13df9b0de53b251522280bb72383700'
            }
        ];
    }


}
