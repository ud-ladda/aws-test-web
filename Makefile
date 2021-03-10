docker:
	docker build -t ras-frontend-nuxt:develop .
	docker stop ras-frontend-nuxt || exit 0
	docker rm -f ras-frontend-nuxt || exit 0
	docker run -d -p 80:80 --name=ras-frontend-nuxt -e "BACKEND_API=xxxx" -e ras-frontend-nuxt:develop
start:
	npm run dev
run:
	npm run build
	npm run start
startdocker:
	docker stop ras-frontend-nuxt || exit 0
	docker rm -f ras-frontend-nuxt || exit 0
	docker run -d -p 80:80 --name=ras-frontend-nuxt -e "MODE=SCGX" ras-frontend-dev:latest