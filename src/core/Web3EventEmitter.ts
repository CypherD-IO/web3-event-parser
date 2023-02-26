import { EventEmitter } from 'node:events';
import { BaseEventHandler, ParsedEventData } from '../model/baseEventHandler';
import { Web3EventQueue } from './SQSClient';

export class Web3EventEmitter extends EventEmitter {
    static startApp(eventListeners: BaseEventHandler[]) {
        const INSTANCE = new Web3EventEmitter(eventListeners);

        console.log("------------------------SwapEventData 1----------------------")
        INSTANCE.emit(`ETHEREUM:0x6c6bc977e13df9b0de53b251522280bb72383700:SwapEventData`,
            {
                chain: 'ETHEREUM',
                contractAddress: '0x6c6bc977e13df9b0de53b251522280bb72383700',
                eventData: {
                    sender: '0x1',
                    recipient: '0x1',
                }
            }
        );

        console.log("------------------------SwapEventData 2----------------------")
        INSTANCE.emit(`ETHEREUM:0x6c6bc977e13df9b0de53b251522280bb72383700:SwapEventData`,
            {
                chain: 'ETHEREUM',
                contractAddress: '0x6c6bc977e13df9b0de53b251522280bb72383700',
                eventData: {
                    sender: '0x1',
                    recipient: '0x2',
                }
            }
        );

        console.log("------------------------BurnEvent 1----------------------")
        INSTANCE.emit(`ETHEREUM:0x6c6bc977e13df9b0de53b251522280bb72383700:BurnEvent`,
            {
                chain: 'ETHEREUM',
                contractAddress: '0x6c6bc977e13df9b0de53b251522280bb72383700',
                eventData: {
                    owner: '0x1',
                    recipient: '0x2',
                    amount: 198228786435629134280847,
                    amount0: 109211677011624714043905211,
                    amount1: 889540921386390000000000000,
                }
            }
        );

        console.log("------------------------MintEvent 1----------------------")
        INSTANCE.emit(`ETHEREUM:0x6c6bc977e13df9b0de53b251522280bb72383700:MintEvent`,
            {
                chain: 'ETHEREUM',
                contractAddress: '0x6c6bc977e13df9b0de53b251522280bb72383700',
                eventData: {
                    owner: '0x1',
                    sender: '0x2',
                    amount: 198228786435629134280847,
                }
            }
        );

        console.log("------------------------MintEvent 2----------------------")
        INSTANCE.emit(`ETHEREUM:0x6c6bc977e13df9b0de53b251522280bb72383700:MintEvent`,
            {
                chain: 'ETHEREUM',
                contractAddress: '0x6c6bc977e13df9b0de53b251522280bb72383700',
                eventData: {
                    owner: '0x1',
                    sender: '0x1',
                    amount: 198228786435629134280847,
                }
            }
        );
        INSTANCE.listenToEventMesssage(new Web3EventQueue());
    }

    constructor(eventListeners: BaseEventHandler[]) {
        super();
        eventListeners.forEach(eventListener => {
            eventListener.registerOnEvents(this);
        })
    }

    listenToEventMesssage(sqs: Web3EventQueue) {
        // eslint-disable-next-line no-console
        console.log('Started pollling messages!');
        setInterval(() => {
            sqs.pollQueue((parsedEventData: ParsedEventData) => {
                // eslint-disable-next-line no-console
                console.log(`Event triggered on ${parsedEventData.chain}:${parsedEventData.contractAddress}:${parsedEventData.eventName}`);
                this.emit(
                    `${parsedEventData.chain}:${parsedEventData.contractAddress}:${parsedEventData.eventName}`,
                    parsedEventData
                );
            })
        }, 10000); // Poll every 10 seconds (adjust as needed)
    }
}

