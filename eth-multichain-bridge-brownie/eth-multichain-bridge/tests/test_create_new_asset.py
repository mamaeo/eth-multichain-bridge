
from brownie import MultiChainBridge, accounts
from bigchaindb_driver.crypto import generate_keypair
from bigchaindb_driver import BigchainDB
from dotenv import load_dotenv
import pytest
import os

# Initialize BigChainDB drivers which are compatibles with multichaindb
bdb = BigchainDB('localhost:9984')
# Load variables contained in .env file
load_dotenv()
# Get localtunnel public url
multichain_public_url = 'INSERT HERE TUNNEL PUBLIC URL'
# Generate new public/private keys
alice = generate_keypair()


@pytest.fixture
def multichain_bridge():
    # Deploy MultiChainBridge contract (see /contracts/multichainBridge.sol)
    # The default accounts used for this test is first
    multichain_bridge = MultiChainBridge.deploy({'from': accounts[0]})
    return multichain_bridge


def test_create_new_transaction():

    asset = {
        'data': {
            # Insert here asset
        }
    }

    metadata = {

    }

    # Import MultiChainBridge contract
    multichain_bridge = multichain_bridge()
    # Prepare transaction
    token_tx = bdb.transactions.fulfill(
        bdb.transactions.prepare(
            operation='CREATE',
            signers=alice.public_key,
            metadata=metadata,
            asset=asset
        ), 
        alice.private_key
    )

    # Send transaction using oracle services
    return multichain_bridge.POST('{}/transactions?mode=commit'
            .format(multichain_public_url), 
        token_tx, {'value': 4*10**8})