TAG = master
DEST_FOLDER = /var/tmp/audiomarket
IMAGE_NAME = localhost:5000/audiomarket

docker-tag-build:
	git clone git@github.com:Nitr/audiomarket.git $(DEST_FOLDER) || true
	cd $(DEST_FOLDER) && git reset --hard origin/$(TAG) && git clean -fd
	docker build -t ${IMAGE_NAME}:$(TAG) \
	  --file $(DEST_FOLDER)/Dockerfile.development \
	  ${DEST_FOLDER}
	docker push ${IMAGE_NAME}:$(TAG)

docker-tag-push:
	docker push ${IMAGE_NAME}:$(TAG)
