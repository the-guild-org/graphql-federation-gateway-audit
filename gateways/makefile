BASE_URL := $(or $(BASE_URL),$(error BASE_URL is not set))

install:
	@for dir in ./gateways/*; do \
		if [ -d $$dir ]; then \
			echo "Installing $$dir"; \
			(cd $$dir && ./install.sh); \
		fi; \
	done

test-cosmo:
	(cd ./gateways && ./run-all.sh $(BASE_URL) cosmo http://127.0.0.1:4000/graphql http://127.0.0.1:4000/health)

test-grafbase:
	(cd ./gateways && ./run-all.sh $(BASE_URL) grafbase http://127.0.0.1:4000/graphql http://127.0.0.1:4000/health)

test-mesh:
	(cd ./gateways && ./run-all.sh $(BASE_URL) mesh http://127.0.0.1:4000/graphql http://127.0.0.1:4000/readiness)

test-router:
	@echo "BASE_URL is: $(BASE_URL)"
	(cd ./gateways && ./run-all.sh $(BASE_URL) router http://127.0.0.1:4000/ http://127.0.0.1:8088/health)

test-all: test-router test-mesh test-grafbase test-cosmo

	
	
	

