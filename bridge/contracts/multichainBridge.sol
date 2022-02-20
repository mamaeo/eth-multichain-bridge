
//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.6.12;
import "./usingProvable.sol";

contract MultiChainBridge is usingProvable {

   event LogQueryResult(string price);
   event LogNewProvableQuery(string description);

   constructor() public {
       // Initialize local tunnel url
   }

   function __callback(bytes32 myid, string memory result) public virtual override {
        //
        if (msg.sender != provable_cbAddress()) {
            // Undo any contract changing
            revert();
        } else {
            // Log result
            emit LogQueryResult(result);
            // Then make some actions
            // Action here ...
        }
   }

   function GET(string memory url) public payable {
       // Verifica la presenza di sufficienti ether per eseguire la transazione
       if (provable_getPrice("URL") > address(this).balance) {
           // Cannot make any request due to missing ether
           emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           // Make a request using oracle service
           emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
           provable_query("URL", url);
       }
   }
   
}
