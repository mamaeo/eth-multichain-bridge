
const driver = require('bigchaindb-driver')

const Ed25519Keypair = new driver.Ed25519Keypair()

const signedTransaction = driver.Transaction.signTransaction(
    driver.Transaction.makeCreateTransaction(
        asset,
        null, 
        // A transaction needs an output
          [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(alice.publicKey)) ],
        alice.publicKey
    ), alice.privateKey
) 

module.exports = Ed25519Keypair;