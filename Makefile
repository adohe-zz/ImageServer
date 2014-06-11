TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 10000
MOCHA_OPTS =

install-test:
	@NODE_ENV=test npm install

test: install-test
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

.PHONY: test
