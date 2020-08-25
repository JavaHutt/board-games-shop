build:
	docker build -t javahutt/board-games-shop .

run:
	docker run -p 49160:3000 -d javahutt/board-games-shop
