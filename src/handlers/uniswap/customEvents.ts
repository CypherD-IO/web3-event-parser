import { CHAIN } from "../../shared/chains.enum";
import { BaseEventHandler, ContractDetail, EventNameWithHandler, NotificationDetail, ParsedEventData } from "../../model/baseEventHandler";
import {BurnEventData, MintEventData, SwapEventData} from "./events";
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
                eventName: 'SwapEventData',
                eventHandler: (parsedEventData: ParsedEventData): NotificationDetail[] => {
                    const eventData = parsedEventData.eventData as SwapEventData;

                    if (eventData.sender === eventData.recipient){
                        return [
                            {
                                address: eventData.recipient,
                                title: 'Your swap is complete',
                                message: `The swap you initiated has been completed.`,
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
                            message: `You have received tokens from a swap initiated by ${eventData.sender}.`,
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
