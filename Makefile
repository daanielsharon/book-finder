mongodbinit:
	@echo "Starting mongodb container..."
	docker run --rm --name mongodb -d -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -p 1234:27017 mongo

up_build: 
	@echo "Stopping docker "