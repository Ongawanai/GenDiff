gendiff:
	node src/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

install:
	npm ci