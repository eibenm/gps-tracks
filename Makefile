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

.PHONY: nuke-data
nuke-data: ## Reset data in database
	@sh ./scripts/nuke-data.sh

.PHONY: connect-shell
connect-shell: ## Connect to docker shell < make connect-shell for=(proxy,webhost,react,postgres) >
ifeq (${for}, proxy)
	@sh ./scripts/connect-container.sh -s proxy
else ifeq (${for}, webhost)
	@sh ./scripts/connect-container.sh -s webhost
else ifeq (${for}, react)
	@sh ./scripts/connect-container.sh -s react
else ifeq (${for}, postgres)
	@sh ./scripts/connect-container.sh -s postgres
else
	@echo ""
	@echo "Use like: \033[1;96m\"make connect-shell for:<container>\"\033[0m"
	@echo "Availible containers: \033[1;96m\"proxy\", \"webhost\", \"react\", \"postgres\"\033[0m"
	@echo ""
endif

.PHONY: follow-logs
follow-logs: ## Follow logs of container  < make follow-logs for=(proxy,webhost,react,postgres) >
ifeq (${for}, proxy)
	@sh ./scripts/container-logs.sh -s proxy
else ifeq (${for}, webhost)
	@sh ./scripts/container-logs.sh -s webhost
else ifeq (${for}, react)
	@sh ./scripts/container-logs.sh -s react
else ifeq (${for}, postgres)
	@sh ./scripts/container-logs.sh -s postgres
else
	@echo ""
	@echo "Use like: \033[1;96m\"make follow-logs for:<container>\"\033[0m"
	@echo "Availible containers: \033[1;96m\"proxy\", \"webhost\", \"react\", \"postgres\"\033[0m"
	@echo ""
endif
