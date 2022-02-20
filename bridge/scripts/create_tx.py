
from brownie import MultiChainBridge, accounts


def main():

    # Contract development
    mcbridge = MultiChainBridge.deploy({'from': accounts[1]})