
//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.6.12;
import "./usingProvable.sol";

contract MultiChainBridge is usingProvable {

    // Events are useful for debugging ...
    event LogQueryResult(string price);
    event LogNewProvableQuery(string description);


    function __callback(bytes32 myid, string memory result) public virtual override {
        // Undo any contract changing
        require (msg.sender == provable_cbAddress());
        // Log query result
        emit LogQueryResult(result);
        // Any action HERE ...
    }

    function GET(string memory url) public virtual payable returns(bytes32 _id) {
        // Require sufficient funds to execute the transaction
        require(provable_getPrice("URL") < address(this).balance);
        // Log
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
        // Send a GET request to multichaindb
        return provable_query("URL", url);
    }

    function POST(string memory url, string memory transaction) public virtual payable returns(bytes32 _id) {
        // Require sufficient funds to execute the transaction
        require(provable_getPrice("URL") < address(this).balance);
        // Log
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
        // Send POST request to multichaindb using oracle service
        return provable_query("URL", [url, transaction]);
    }
   
}
