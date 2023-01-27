gendiff:
	node src/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

install:
	npm ci

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage