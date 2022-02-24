

//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.6.12;

import "./multichainBridge.sol";

contract Medium is MultiChainBridge {

    uint constant public _price = 5 * 10**15;
    address payable owner;

    // Store transaction id
    bytes32 private subscription_query_id;

    constructor() public {
        // Make this contract as owner 
        owner = msg.sender;
    }

    function __callback(bytes32 myid, string memory result) public virtual override {
        // Call superclass method
        super.__callback(myid, result);

        if (myid == subscription_query_id) {
            // if (result != "OK") then transfer money
            revert();
        }
    }

    function subscribe(string memory url, string memory new_permission_transaction) public payable {
        // Check client balance
        require(address(this).balance > _price);
        // Move money from client balance to this smart contract
        owner.transfer(_price);
        // Add access permission for this new client
        subscription_query_id = POST(url, new_permission_transaction);
    }


}