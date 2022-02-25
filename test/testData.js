
/* This script provide variables and data for testing purposes */

const driver = require('bigchaindb-driver')
const fs = require('fs')

append_to_json_file = (jsonContent) => {
	fs.writeFileSync("output.json", jsonContent, 'utf8', function (err) {
		if (err) {
			console.log("An error occured while writing JSON Object to File.");
			return console.log(err);
		}
		console.log("JSON file has been saved.");
	});
}	


if (!fs.existsSync('output.json')){
	jsonContent = JSON.stringify({
		'keyPairs': Array.from({length: 2}, (_, k) => {
			return new driver.Ed25519Keypair();
		})
	})
	// Append keyPairs to output.json
	append_to_json_file(jsonContent);
}

// Read key pairs
data = JSON.parse(
	fs.readFileSync('output.json', 'utf-8', function(err) {
		if (err) {
			console.log("An error occured on output.json reading")
			return console.log(err)
		}
	})
)

if (data['keyPairs'] === undefined) {
	data['keyPairs'] = Array.from({length: 2}, (_, k) => (new driver.Ed25519Keypair()))
	// Append keypairs to output.json
	append_to_json_file(JSON.stringify(data));
}

// Create two keyPairs for testing purposes
alice = data.keyPairs[0]
bob = data.keyPairs[1]

// Create new asset
asset = {
	'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
		'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
		'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
		'nisi ut aliquip ex ea commodo consequat. ' +
		'Duis aute irure dolor in reprehenderit in voluptate ' +
		'velit esse cillum dolore eu fugiat nulla pariatur. ' +
		'Excepteur sint occaecat cupidatat non proident, ' +
		'sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

// Create new transaction
const transaction = driver.Transaction.makeCreateTransaction(
  	// L'asset in questione è un testo classico (Lorem Ipsum)
	asset,
  	null, 
  	// A transaction needs an output
    [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(alice.publicKey)) ],
	alice.publicKey
)

// Change transaction version 
transaction.version = '1.0';

const signedTransaction = driver.Transaction
	.signTransaction(transaction, alice.privateKey) 


// Create transfer transaction in order to change its ownership
const createTranferToBob = driver.Transaction.makeTransferTransaction(
	// Get output
	[{ tx: signedTransaction, output_index: 0 }],
	// Get alice public key 
	[driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(bob.publicKey))],
	// Insert new metadata
	{'': ''}
)

// Fulfill transaction with alice private key
const signedTransferToBob = driver.Transaction.signTransaction(createTranferToBob, alice.privateKey)

data['signedTransaction'] = signedTransaction
data['signedTransferToBob'] = signedTransferToBob

module.exports = { data };