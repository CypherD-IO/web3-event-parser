import dotenv from "dotenv";
import { TrasnferEventHandelr } from './handlers/ERC20/transfer';
import { BaseEventHandler } from './model/baseEventHandler';
import { Web3EventEmitter } from './core/Web3EventEmitter';
import {UniswapV3EventHandler} from "./handlers/uniswap/customEvents";

dotenv.config();
const eventListeners: BaseEventHandler[] =
    [
        // Register your event handler here.
        new TrasnferEventHandelr(),
        new UniswapV3EventHandler()
    ];

Web3EventEmitter.startApp(eventListeners);