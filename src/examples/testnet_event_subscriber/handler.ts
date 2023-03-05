import { ethers } from "ethers";
import { CHAIN } from "../../shared/chains.enum";
import { BaseEventHandler, ContractDetail, EventNameWithHandler, NotificationDetail, ParsedEventData } from "../../model/baseEventHandler";
import { UNSEEN_POOL_ADDRESS } from "./contracts/contract";
import { DepositEventData } from "./contracts/deposit.event";
import { BigNumber} from "@ethersproject/bignumber";
import { DistributeEventData } from "./contracts/distribute.event";


export class DepositEventHandler extends BaseEventHandler {

    getContractDetails(): ContractDetail[] {
        return [
            {
                chain: CHAIN.SEPOLIA,
                address: UNSEEN_POOL_ADDRESS
            }
        ];
    }

    getEventsToRegister(): EventNameWithHandler[] {
        return [
            {
                eventName: 'Deposit',
                eventHandler: this.eventProcessor
            }
        ];
    }

    eventProcessor = (parsedEventData: ParsedEventData): NotificationDetail[] => {
        const eventData = parsedEventData.eventData as DepositEventData;
        const value = BigNumber.from(eventData.amount);
        return [
            {
                address: eventData.from, // Wallet address to be notified
                title: `Thanks for your Donation`, // Short title of the event
                message: `There is a donation from you for amount ${ethers.utils.formatEther(value)}.`,
                options: { // Use case specific options which would need updates on the consumer side of notification to handle
                    'url': "www.cypherwallet.io",
                    'raw': JSON.stringify(parsedEventData)
                }
            },
        ]
    }
}

export class DistributeEventHandler extends BaseEventHandler {

    getContractDetails(): ContractDetail[] {
        return [
            {
                chain: CHAIN.SEPOLIA,
                address: UNSEEN_POOL_ADDRESS
            }
        ];
    }

    getEventsToRegister(): EventNameWithHandler[] {
        return [
            {
                eventName: 'Distribute',
                eventHandler: this.eventProcessor
            }
        ];
    }

    eventProcessor = (parsedEventData: ParsedEventData): NotificationDetail[] => {
        const eventData = parsedEventData.eventData as DistributeEventData;
        const value = BigNumber.from(eventData.amount);
        const source_value = BigNumber.from(eventData.source_value);
        const w3p_value = BigNumber.from(eventData.w3p_value);
        const worth_value = parseFloat(ethers.utils.formatEther(source_value)) / parseFloat(ethers.utils.formatEther(w3p_value));
        return [
            {
                address: eventData.to, // Wallet address to be notified
                title: `You have tokenized ${ethers.utils.formatEther(value)}`, // Short title of the event
                message: `Each token is worth ${worth_value}}.`,
                options: { // Use case specific options which would need updates on the consumer side of notification to handle
                    'url': "www.cypherwallet.io",
                    'raw': JSON.stringify(parsedEventData)
                }
            },
        ]
    }
}