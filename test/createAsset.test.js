
const AssetManagement = artifacts.require("AssetManagement");

// in questo esempio alice crea un'opera nft
// e decida di salvarla in multichaindb
const {data} = require('./testData');


contract("AssetManagement", async (accounts) => {
    
    var assetManagement;

    // Deploy smart contract
	before(async () => {
	  	// call this method before contract deployments
      	assetManagement = await AssetManagement.deployed();
	});

    // Execute smart contract function
  	it("Create new asset", async () => {
        // Run contract's function 
        const receipt = await assetManagement.createNewAsset(data.localUrl + '/api/v1/transactions?mode=commit', 
            " " + JSON.stringify(data.signedTransaction), {'from': accounts[0], 'value': 5*10**15})

        console.log(receipt);
  	});


});