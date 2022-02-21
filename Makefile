
ECHO := /usr/bin/env echo

IS_PYTHON_INSTALLED := $(shell command -v python3 2> /dev/null)
IS_NPM_INSTALLED := $(shell command -v npm -v 2> /dev/null)
ERROR := 0
# Default port used by brownie service
# Change it if you change network configurations on brownie
PORT := 0

run: check-deps
	brownie console
	ethereum-bridge -H localhost:8545 -a 1
	lt --port $(PORT)

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
	python3 setup.py
	npm start