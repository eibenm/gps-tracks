.DEFAULT_GOAL := help

# Cite: https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: init
init: ## Setup local enviornment
	@sh ./scripts/init.sh

.PHONY: init-install
init-install: ## Setup local enviornment.  Also updates brews and npm/node.
	@sh ./scripts/init.sh -b -n

.PHONY: up
up: ## Run the application.  ( assumes "make init" has already been run )
	@docker-compose up -d
	@echo "Application availible: http://localhost:81/"

.PHONY: down
down: ## Stop the applicaiton.
	@docker-compose down -v

.PHONY: pgadmin
pgadmin: ## Spin up the pgadmin container.
	@sh ./scripts/pgadmin.sh

.PHONY: pgadmin-down
pgadmin-down: ## Spin down the pgadmin container.
	@sh ./scripts/pgadmin-down.sh

.PHONY: php-shell
webhost-shell: ## Enter the php container
	@sh ./scripts/connect-container.sh -s webhost

.PHONY: react-shell
react-shell: ## Enter the react container
	@sh ./scripts/connect-container.sh -s react

.PHONY: postgres-shell
postgres-shell: ## Enter the postgres container
	@sh ./scripts/connect-container.sh -s postgres

.PHONY: nuke-data
nuke-data: ## Reset data in database
	@sh ./scripts/nuke-data.sh
