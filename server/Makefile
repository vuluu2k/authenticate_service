build:
	chmod 777 bun.lockb;
	docker compose build authenticate-service-api;
install:
	docker compose exec authenticate-service-api bun install --no-save;
app:
	docker-compose -f docker-compose.yml down; docker-compose -f docker-compose.yml up;
bash:
	docker compose run authenticate-service-api bash;