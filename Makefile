
ECHO := /usr/bin/env echo

IS_NPM_INSTALLED := $(shell command -v npm -v 2> /dev/null)
NPM_GLOBAL_DEPENDENCIES := truffle ganache lt ethereum-bridge
ERROR := 0
# Default port used by development network blockchain
STD_DEV_PORT := 8545
MULTICHAIN_API_PORT := 9984
# Standard user which deploy contracts
DEPLOYER = 0

start: check-deps ganache eth-bridge localtunnel
# Do nothing

ganache:
	ganache --chain.vmErrorsOnRPCResponse true --server.port $(STD_DEV_PORT) --miner.blockGasLimit 12000000 --wallet.totalAccounts 10 --hardfork istanbul &> ganache-cli.log

eth-bridge: ganache-conn
	ethereum-bridge -H localhost:$(STD_DEV_PORT) -a $(DEPLOYER) &> bridge.log

localtunnel:
#lt --port $(MULTICHAIN_API_PORT) &> localtunnel.log
	node index.js

ganache-conn:
	@while nmap -p 8545 localhost | grep -A1 'STATE' | grep 'closed'; do \
		attempts=$$(( attempts + 1 )); \
		if [[ $$attempts > 3 ]]; then \
			echo "Error: cannot connect to RPC on port $(STD_DEV_PORT)"; \
			break; \
		else \
			sleep 5; \
		fi; \
	done; \

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
	@npm install
	@for dep in $(NPM_GLOBAL_DEPENDENCIES); do \
		if ! command -v $$dep &> /dev/null; then \
			@$(ECHO) "$$dep not found!"; \
			@$(ECHO) "Installing $$dep ..."; \
			npm run $$dep; \
		fi; \
	done; \

