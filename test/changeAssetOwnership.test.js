
const AssetManagement = artifacts.require("AssetManagement");

// In questo esempio l'opera nft creata precedentemente da alice viene 
// venduta a bob per un costo complessivo di 50*10**20
const {data} = require('./testData');

contract("AssetManagement", async (accounts) => {
    
    var assetManagement;

    // Deploy smart contract
	before(async () => {
	  	// call this method before contract deployments
      	assetManagement = await AssetManagement.deployed();
	});

    // Execute smart contract function
  	it("Get asset by transaction id", async () => {
		// Request change of ownership from alice to bob at price of 50*10**20
		const receipt = assetManagement.changeAssetOwner(data.localUrl + '/api/v1/transactions', 
			JSON.stringify(signedTransferToBob), accounts[0], 50*10**20, 
			// the transaction will be borne by bob
			{'from': accounts[1], 'value': 5*10**15})

		console.log(receipt)

  	});


});