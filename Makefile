include make-docker.mk

ansible-roles-install:
	ansible-galaxy install -f -r requirements.yml

staging-setup:
	ansible-playbook ansible/staging-setup.yml -u ubuntu -i ansible/staging -vv

app-build:
	ansible-playbook ansible/app-build.yml -u ubuntu -i ansible/staging -vv

nginx-build:
	ansible-playbook ansible/nginx-build.yml -u ubuntu -i ansible/staging -vv

deploy-staging:
	ansible-playbook ansible/deploy.yml -u ubuntu -i ansible/staging -vv

compose:
	docker-compose up

compose-setup: compose-build compose-install

compose-build:
	docker-compose build

compose-bash:
	docker-compose run web bash

compose-install:
	docker-compose run web bundle install --path vendor/bundle

compose-kill:
	docker-compose kill
