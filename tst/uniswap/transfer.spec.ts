import { TrasnferEventHandelr } from "../../src/handlers/ERC20/transfer";
import { CHAIN } from "../../src/shared/chains.enum";
import {UniswapV3EventHandler} from "../../src/handlers/uniswap/customEvents";

describe("Uniswap V3 Events", () => {
    it("is parsing the right IncreaseLiquidity event", () => {
        const UniswapTransferEventHandler = new UniswapV3EventHandler();
        const result =  UniswapTransferEventHandler.getEventsToRegister()[0].eventHandler({
            chain: CHAIN.ETHEREUM, contractAddress: '0x111', eventName: 'IncreaseLiquidity', eventData: { sender: 'ABC', owner: 'DEF', amount: 122222345}
        })
        expect(result[0].address).toBe('ABC');
        expect(result[1].address).toBe('DEF');
        expect(result[0].title).toBe('Liquidity Increased for your position');
        expect(result[0].message).toBe('The liquidity was minted by the amount 122');
        expect(result[1].title).toBe('Liquidity Increased for your owned position');
        expect(result[1].message).toBe('The liquidity was minted by ABC at the amount 122');
    });

    it("is parsing the right SwapEventData event", () => {
        const UniswapTransferEventHandler = new UniswapV3EventHandler();
        const result =  UniswapTransferEventHandler.getEventsToRegister()[1].eventHandler({
            chain: CHAIN.ETHEREUM, contractAddress: '0x111', eventName: 'SwapEventData', eventData: { sender: 'ABC', recipient: 'DEF'}
        })
        expect(result[0].address).toBe('ABC');
        expect(result[1].address).toBe('DEF');

        expect(result[0].title).toBe('Your swap is complete');
        expect(result[0].message).toBe('The swap you triggered has been completed');
        expect(result[1].title).toBe('Swap is complete');
        expect(result[1].message).toBe('You have received tokens from a swap.');
    });

    it("is parsing the right Burn event", () => {
        const UniswapTransferEventHandler = new UniswapV3EventHandler();
        const result =  UniswapTransferEventHandler.getEventsToRegister()[2].eventHandler({
            chain: CHAIN.ETHEREUM, contractAddress: '0x111', eventName: 'BurnEvent', eventData: { owner: 'ABC', amount: 12345, amount0: 12345, amount1: 12345}
        })
        expect(result[0].address).toBe('ABC');
        expect(result[0].title).toBe('Removed from liquidity position');
        expect(result[0].message).toBe('Your liquidity position has been removed and a total of 12345');
    });
});