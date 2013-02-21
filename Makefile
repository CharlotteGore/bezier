install:
	@npm install

build: install
	@echo build ...
	@./node_modules/.bin/component-install
	@./node_modules/.bin/component-build

test: build
	@echo test ...
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs test/testrunner.html

.PHONY: test build