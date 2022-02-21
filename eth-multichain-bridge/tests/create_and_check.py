
from brownie import MultiChainBridge, accounts
from bigchain_driver.crypto import generate_keypair
from bigchain_driver import BigchainDB
from dotenv import load_dotenv
import pytest
import os

# Initialize BigChainDB drivers which are compatibles with multichaindb
bdb = BigchainDB(None)
# Load variables contained in .env file
load_dotenv()
# Get localtunnel public url
multichain_public_url = os.getenv('LOCALTUNNEL_URL')
# Generate new public/private keys
alice = generate_keypair()

@pytest.fixture
def multichain_bridge():
    # Deploy MultiChainBridge contract (see /contracts/multichainBridge.sol)
    # The default accounts used for this test is first
    multichain_bridge = MultiChainBridge.deploy({'from': accounts[0]})
    return multichain_bridge


def test_create_new_transaction(asset):
    # Import MultiChainBridge contract
    multichain_bridge = multichain_bridge()
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


def test_get_transaction():
    # Import MultiChainBridge contract
    multichain_bridge = multichain_bridge()
    # Get transaction from multichain
    return multichain_bridge.GET('{}/api/v1/outputs?public_key={}'
            .format(multichain_public_url, alice.public_key), 
        {'value': 4*10**8})
