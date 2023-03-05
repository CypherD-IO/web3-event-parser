pragma solidity >=0.8.2 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";


contract UnseenPool is ERC20PresetMinterPauser {
    struct ConvertPayload {
        address to;
        uint amount;
    }

    ERC20 public source_token_contract;
    uint public w2p_supply;
    uint public source_token_in_w2p;
    uint public threshold;

    uint public w3p_supply;
    uint public source_token_in_w3p;

    constructor(ERC20 _token, uint _threshold, string memory _name, string memory _symbol)
        ERC20PresetMinterPauser(_name, _symbol){
        source_token_contract = _token;
        w2p_supply = 0;
        source_token_in_w2p = 0;
        threshold = _threshold;
        w3p_supply = 0;
        source_token_in_w3p = 0;
    }

    event Deposit(address indexed _from, uint indexed _amount, uint _new_amount);

    function deposit(uint source_amount, uint w2p_amount) public payable {
        bool success = source_token_contract.transferFrom(msg.sender, address(this), source_amount);
        if (success) {
            emit Deposit(msg.sender, source_amount, w2p_amount);
            w2p_supply += w2p_amount;
            source_token_in_w2p += source_amount;
        }
        require(success, "Transaction was not successful");
    }

    event Distribute(address indexed _to, uint indexed _amount, uint w3p_value, uint source_value);

    function convert(ConvertPayload[] calldata payloads) public {
        require(w2p_supply >= threshold, "Threshold not reached to convert");
        uint amount_to_convert = w2p_supply;

        w3p_supply += amount_to_convert;
        w2p_supply = 0;

        source_token_in_w3p += source_token_in_w2p;
        source_token_in_w2p = 0;

        uint transferred_w3p = 0;

        for (uint i = 0; i < payloads.length; i++) {
            _mint(payable(payloads[i].to), payloads[i].amount);
            _approve(payloads[i].to, msg.sender, allowance(payloads[i].to, msg.sender) + payloads[i].amount);
            transferred_w3p += payloads[i].amount;
            emit Distribute(payloads[i].to, payloads[i].amount, w3p_supply, source_token_in_w3p);
        }

        require(transferred_w3p == amount_to_convert, "Convert amount is not correct");
    }

    function redeem(uint w3p_amount, uint source_amount) public {
        burnFrom(msg.sender, w3p_amount);

        bool success = source_token_contract.transfer(payable(msg.sender), source_amount);
        if (success) {
            w3p_supply -= w3p_amount;
            source_token_in_w3p -= source_amount;
        }
        require(success, "Transaction is not completed");
    }
}