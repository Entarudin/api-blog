down:
	docker-compose down

build: 
	docker-compose build

up: build
	docker-compose up -d