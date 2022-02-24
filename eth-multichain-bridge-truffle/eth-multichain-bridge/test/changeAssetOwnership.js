
const AssetManagement = artifacts.require("AssetManagement");
const driver = require('bigchaindb-driver')

// Supponiamo che l'utente proprietario del primo account crei un'opera nft
// e decida di salvarla in multichaindb
const alice = require('./testData');
const transaction_id = ''

contract("AssetManagement", (accounts) => {
    
    var assetManagement;

    // Deploy smart contract
	before(async () => {
	  	// call this method before contract deployments
      	assetManagement = await AssetManagement.deployed();
	});

    // Execute smart contract function
  	it("Get asset by transaction id", async () => {
        // Create valid signed transaction
        const receipt = assetManagement
			.getAsset(`https://horrible-lizard-51.loca.lt/api/v1/transactions/${transaction_id}`);

        console.log(receipt);

  	});


});