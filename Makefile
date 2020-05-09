bs:
	npm run watch

deploy:
	npm run build
	gh-pages -d build