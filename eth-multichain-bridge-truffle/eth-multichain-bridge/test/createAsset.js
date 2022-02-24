
const AssetManagement = artifacts.require("AssetManagement");
const driver = require('bigchaindb-driver')

// Supponiamo che l'utente proprietario del primo account crei un'opera nft
// e decida di salvarla in multichaindb
const alice = require('./testData');

// L'asset in questione è un testo classico (Lorem Ipsum)
asset = {
    'article': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' /
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' /
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' /
        'nisi ut aliquip ex ea commodo consequat. ' /
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ' /
        'dolore eu fugiat nulla pariatur. ' /
        'Excepteur sint occaecat cupidatat non proident, ' /
        'sunt in culpa qui officia deserunt mollit anim id est laborum.'
}


contract("AssetManagement", (accounts) => {
    
    var assetManagement;

    // Deploy smart contract
	before(async () => {
	  	// call this method before contract deployments
      	assetManagement = await AssetManagement.deployed();
	});

    // Execute smart contract function
  	it("Create new asset", async () => {
        // Create valid signed transaction
        const signedTransaction = driver.Transaction.signTransaction(
            driver.Transaction.makeCreateTransaction(
                asset,
                null, 
                // A transaction needs an output
      	        [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(alice.publicKey)) ],
                alice.publicKey
            ), alice.privateKey
        ) 
        // Run contract's function 
        const receipt = await assetManagement.createNewAsset("https://horrible-lizard-51.loca.lt/api/v1/transactions", 
            JSON.stringify(signedTransaction), {'from': accounts[0], 'value': 4*10**15})
        // Print logs resulting from transaction
        console.log(receipt);
  	});


});