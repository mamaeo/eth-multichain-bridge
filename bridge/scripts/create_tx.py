
from brownie import MultiChainBridge, accounts
from bigchain_driver import BigchainDB

# Initialize BigChainDB drivers which are compatibles with multichaindb
bdb = BigchainDB(None)

multichain_public_url = ''


def main():
    # Deploy MultiChainBridge contract (see /contracts/multichainBridge.sol)
    multichain_bridge = MultiChainBridge.deploy({'from': accounts[1]})
    return multichain_bridge


def create_new_transaction(user_pubkey, asset, user_secret):
    # Import MultiChainBridge contract
    multichain_bridge = main()
    # Prepare transaction
    token_tx = bdb.transactions.fulfill(
        bdb.transactions.prepare(
            operation='CREATE',
            signers=user_pubkey,
            recipients=None,
            asset=asset
        ), 
        user_secret
    )
    # Send transaction using oracle services
    multichain_bridge.POST('{}/transactions?mode=commit'
        .format(multichain_public_url), token_tx)


def get_transaction(transaction_id):
    # Import MultiChainBridge contract
    multichain_bridge = main()
    # Get transaction from multichain
    tx = multichain_bridge.GET('{}/api/v1/transactions/{}'
        .format(multichain_public_url, transaction_id))

    print(tx)