
ECHO := /usr/bin/env echo

IS_PYTHON_INSTALLED := $(shell command -v python3 2> /dev/null)
IS_NPM_INSTALLED := $(shell command -v npm -v 2> /dev/null)
RUN_BROWNIE_IN_BACKGROUND := $(shell command brownie console &2> /dev/null)
ERROR := 0
# Default port used by brownie
DEFAULT_BROWNIE_PORT := 8545
MULTICHAIN_API_PORT := 9984

test: init
ifndef RUN_BROWNIE_IN_BACKGROUND
	@$(ECHO) "Error: cannot start brownie"
else
	ethereum-bridge -H localhost:$(DEFAULT_BROWNIE_PORT) -a 0
	lt --port $(MULTICHAIN_API_PORT)
	brownie test create_and_check
endif


check-deps: python-deps npm-deps
ifndef ERROR
	@$(ECHO) "Please install dependencies"	
endif

python-deps:
ifndef IS_PYTHON_INSTALLED
	@$(ECHO) "Error: python is not installed"
	ERROR := 1
endif

npm-deps:
ifndef IS_NPM_INSTALLED
	@$(ECHO) "Error: npm is not installed"
	ERROR := 1
endif

init:
	pip3 install -r requirements.txt
	npm install