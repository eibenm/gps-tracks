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

.PHONY: run
run: ## Run the application.  ( assumes "make init" has already been run )
	@docker-compose up -d

.PHONY: down
down: ## Stop the applicaiton.
	@docker-compose down -v

.PHONY: pgadmin
pgadmin: ## Spin up the pgadmin container.
	@sh ./scripts/pgadmin.sh

.PHONY: pgadmin-down
pgadmin-down: ## Spin down the pgadmin container.
	@sh ./scripts/pgadmin-down.sh
