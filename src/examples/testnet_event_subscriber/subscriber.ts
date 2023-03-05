import { ethers } from 'ethers';
import { UNSEEN_POOL_ADDRESS } from './contracts/contract';
import UNSENN_POOL_ABI from './contracts/unseen_pool.abi.json';

import { Web3EventEmitter } from '../../core/Web3EventEmitter';
import { DepositEventHandler, DistributeEventHandler } from './handler';

const provider = ethers.getDefaultProvider('sepolia');

const contractAddress = UNSEEN_POOL_ADDRESS; // Replace with your contract address
const contractAbi = UNSENN_POOL_ABI // Replace with your contract ABI

const contract = new ethers.Contract(contractAddress, contractAbi, provider);


const emitter = new Web3EventEmitter([]);
emitter.addEventListener(new DepositEventHandler());
emitter.addEventListener(new DistributeEventHandler());


contract.on('Deposit', (from, amount, new_amount) => {
    console.log(from, amount, new_amount);
    emitter.emit(
        `SEPOLIA:0xd6b805bBa3d65e42E13Febf1A4FC6f6aba48d372:Deposit`,{
        chain: 'SEPOLIA',
        contractAddress: UNSEEN_POOL_ADDRESS,
        eventData: {
            from: from,
            amount: amount,
            new_amount: new_amount
        }
    })
});

contract.on('Distribute', (to, amount, w3p_value, source_value) => {
    console.log(to, amount, w3p_value, source_value);
    emitter.emit(
        `SEPOLIA:0xd6b805bBa3d65e42E13Febf1A4FC6f6aba48d372:Distribute`,{
        chain: 'SEPOLIA',
        contractAddress: UNSEEN_POOL_ADDRESS,
        eventData: {
            to: to,
            amount: amount,
            w3p_value: w3p_value,
            source_value: source_value
        }
    })
});
