include .env

down:
	docker-compose down

build: 
	docker-compose down
	docker-compose build

up: build
	docker-compose up -d