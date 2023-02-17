import dotenv from "dotenv";
import { TrasnferEventHandelr } from './handlers/ERC20/transfer';
import { BaseEventHandler } from './model/baseEventHandler';
import { Web3EventEmitter } from './core/Web3EventEmitter';

dotenv.config();
const eventListeners: BaseEventHandler[] =
    [
        // Register your event handler here.
        new TrasnferEventHandelr()
    ];

Web3EventEmitter.startApp(eventListeners);