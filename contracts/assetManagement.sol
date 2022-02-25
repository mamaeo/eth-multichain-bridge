
//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.6.12;

import "./multichainBridge.sol";

contract AssetManagement is MultiChainBridge {

    bytes32 changeAssetQueryID;

    function __callback(bytes32 myid, string memory result) public virtual override {
        // Call superclass method
        super.__callback(myid, result);

    }

    function changeAssetOwner(string memory url, string memory new_transaction, address payable _to, uint256 _value) public payable {
        // Check account balance
        require(address(this).balance > _value);
        // Transfer money from this account to receipt
        _to.transfer(_value);
        // Make transaction change ownership
        changeAssetQueryID = POST(url, new_transaction);
    }

    function createNewAsset(string memory url, string memory transaction) public payable {
        // Call superclass post method
        POST(url, transaction);
    }

    function getAsset(string memory url) public payable {
        // Call superclass get method
        GET(url);
    }


}