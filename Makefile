bs:
	npm run watch

deploy:
	rm -rf build
	npm run build
	(cd build && git init && git remote add origin https://github.com/jtd2226/mia.git && git checkout -b vercel && git add . && git commit -m "deploy to vercel" && git push -u --force origin vercel)