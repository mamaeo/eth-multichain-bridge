
//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.6.12;
import "./usingProvable.sol";

contract MultiChainBridge is usingProvable {

    event LogQueryResult(string price);
    event LogNewProvableQuery(string description);
    // Define here multichain public url
    string multichainURL = "/*INSERT HERE PUBLIC URL TO MULTICHAINDB*/";


    function __callback(bytes32 myid, string memory result) public virtual override {
        //
        if (msg.sender != provable_cbAddress()) {
            // Undo any contract changing
            revert();
        } else {
            // Log result
            emit LogQueryResult(result);
            // Then make more actions
            // Action here ...
        }
    }

    function GET(string memory url) public payable {
        // check for sufficient funds to execute the transaction
        if (provable_getPrice("URL") > address(this).balance) {
            // Cannot make any request due to missing ether
            emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            // Make a request using oracle service
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            provable_query("URL", url);
        }
    }

    function get_transaction_by_id(string memory txid) public payable {
        // Create request get url
        string memory request_url = string(abi.encodePacked(multichainURL, "/api/v1/transactions/", txid));
        // Call get method from this class
        GET(request_url);
    }



    function POST(string memory url, string memory tx_json) public payable {
        
    }
   
}
