
const MultiChainBridge = artifacts.require("MultiChainBridge");
const driver = require('bigchaindb-driver')

  
const assetdata = {
    'bicycle': {
        'serial_number': 'abcd1234',
        'manufacturer': 'Bicycle Inc.',
    }
}
  
const metadata = {
	'planet': 'earth'
}

contract("MultiChainBridge", (accounts) => {

  	let bridge;
  	const alice = new driver.Ed25519Keypair()

  	const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
      	assetdata,
      	metadata,
      	// A transaction needs an output
      	[ driver.Transaction.makeOutput(
          	driver.Transaction.makeEd25519Condition(alice.publicKey))
      	],
      	alice.publicKey
  	)

  	var txCreateAliceSimpleSigned = driver.Transaction
	  	.signTransaction(txCreateAliceSimple, alice.privateKey)
    
  	before(async () => {
	  	// call this method before contract deployments
      	bridge = await MultiChainBridge.deployed();
 	});

  	describe("Call POST method from MultiChainBridge contract", async () => {
		//
    	it("Insert new transaction into multichain", async () => {

			await bridge.POST("INSERT_YOUR_PUBLIC_URL/api/v1/transactions?mode=commit", 
        		" " + JSON.stringify(txCreateAliceSimpleSigned), 
        		{'from': accounts[0], 'value': 4*10**15});

    	});

  	});

});