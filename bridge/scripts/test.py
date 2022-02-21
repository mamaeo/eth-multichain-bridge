
from brownie import MultiChainBridge, accounts
from bigchain_driver.crypto import generate_keypair
from bigchain_driver import BigchainDB
from dotenv import load_dotenv
import os

# Initialize BigChainDB drivers which are compatibles with multichaindb
bdb = BigchainDB(None)
# Load variables contained in .env file
load_dotenv()

multichain_public_url = os.getenv('https://purple-ape-68.loca.lt')

alice = generate_keypair()

def main():
    # Deploy MultiChainBridge contract (see /contracts/multichainBridge.sol)
    multichain_bridge = MultiChainBridge.deploy({'from': accounts[1]})
    return multichain_bridge


def create_new_transaction(asset):
    # Import MultiChainBridge contract
    multichain_bridge = main()
    # Prepare transaction
    token_tx = bdb.transactions.fulfill(
        bdb.transactions.prepare(
            operation='CREATE',
            signers=alice.public_key,
            recipients=None,
            asset=asset
        ), 
        alice.private_key
    )
    # Send transaction using oracle services
    return multichain_bridge.POST('{}/transactions?mode=commit'
            .format(multichain_public_url), 
        token_tx, {'value': 4*10**8})


def get_transaction(transaction_id):
    # Import MultiChainBridge contract
    multichain_bridge = main()
    # Get transaction from multichain
    return multichain_bridge.GET('{}/api/v1/transactions/{}'
            .format(multichain_public_url, transaction_id), 
        {'value': 4*10**8})
