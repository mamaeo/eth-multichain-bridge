
ECHO := /usr/bin/env echo

IS_NPM_INSTALLED := $(shell command -v npm -v 2> /dev/null)
NPM_DEPENDENCIES := truffle ganache lt ethereum-bridge
ERROR := 0
# Default port used by development network blockchain
STD_DEV_PORT := 8545
MULTICHAIN_API_PORT := 9984
# Standard user which deploy contracts
DEPLOYER = 0

run: build ganache eth-bridge localtunnel
	truffle console

test: build ganache eth-bridge localtunnel
	truffle test

ganache:
	ganache-cli --chain.vmErrorsOnRPCResponse true --server.port $(STD_DEV_PORT) --miner.blockGasLimit 12000000 --wallet.totalAccounts 10 --hardfork istanbul &

eth-bridge:
	#deploy contracts using first account found on the localhost:8545 node
	ethereum-bridge -H localhost:$(STD_DEV_PORT) -a $(DEPLOYER) &

localtunnel:
	lt --port $(MULTICHAIN_API_PORT) &

build: check-deps
	truffle compile
	truffle migrate
	
check-deps: npm npm-deps
ifndef ERROR
	@$(ECHO) "Please install dependencies"	
endif

npm:
ifndef IS_NPM_INSTALLED
	@$(ECHO) "Error: npm is not installed"
	ERROR := 1
endif

npm-deps: npm
	@for dep in $(NPM_DEPENDENCIES); do \
		if ! command -v $$dep &> /dev/null; then \
			@$(ECHO) "$$dep not found!"; \
			@$(ECHO) "Installing $$dep ..."; \
			npm run $$dep; \
		fi; \
	done; \

