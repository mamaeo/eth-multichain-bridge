
ECHO := /usr/bin/env echo

IS_PYTHON_INSTALLED := $(shell command -v python3 2> /dev/null)
IS_NPM_INSTALLED := $(shell command -v npm -v 2> /dev/null)
ERROR := 0
# Default port used by brownie
DEFAULT_BROWNIE_PORT := 8545
MULTICHAIN_API_PORT := 9984

run: build ganache eth-bridge localtunnel
	brownie console

ganache:
	ganache-cli --chain.vmErrorsOnRPCResponse true --server.port $(STD_DEV_PORT) --miner.blockGasLimit 12000000 --wallet.totalAccounts 10 --hardfork istanbul &

eth-bridge:
	#deploy contracts using first account found on the localhost:8545 node
	ethereum-bridge -H localhost:$(STD_DEV_PORT) -a $(DEPLOYER) &

localtunnel:
	lt --port $(MULTICHAIN_API_PORT) &

check-deps: python-deps npm-deps
ifndef ERROR
	@$(ECHO) "Please install dependencies"	
endif

python:
ifndef IS_PYTHON_INSTALLED
	@$(ECHO) "Error: python is not installed"
	ERROR := 1
endif

python-deps:
	pip3 install -r requirements.txt

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
