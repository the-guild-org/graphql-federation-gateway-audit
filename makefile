BASE_URL := $(or $(BASE_URL), "http://localhost:4200")
TESTS := $(or $(TESTS), "")

install:
	npm install
	@for dir in ./gateways/*; do \
		if [ -d $$dir ]; then \
			echo "Installing $$dir"; \
			(cd $$dir && ./install.sh); \
			echo "\n"; \
		fi; \
	done

subgraphs:
	npm run dev

test-cosmo:
	(cd gateways && ./run-all.sh $(BASE_URL) cosmo http://127.0.0.1:4000/graphql http://127.0.0.1:4000/health 5s $(TESTS))
run-cosmo:
	(cd gateways/cosmo && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-grafbase:
	(cd gateways && ./run-all.sh $(BASE_URL) grafbase http://127.0.0.1:4000/graphql http://127.0.0.1:4000/health 5s $(TESTS))
run-grafbase:
	(cd gateways/grafbase && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-mesh:
	(cd gateways && ./run-all.sh $(BASE_URL) mesh http://127.0.0.1:4000/graphql http://127.0.0.1:4000/healthcheck 30s $(TESTS))
run-mesh:
	(cd gateways/mesh && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-router:
	(cd gateways && ./run-all.sh $(BASE_URL) router http://127.0.0.1:4000/ http://127.0.0.1:8088/health 5s $(TESTS))
run-router:
	(cd gateways/router && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-router-new:
	(cd gateways && ./run-all.sh $(BASE_URL) router-new http://127.0.0.1:4000/ http://127.0.0.1:8088/health 5s $(TESTS))
run-router-new:
	(cd gateways/router-new && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-all: test-router test-router-new test-mesh test-grafbase test-cosmo summary

summary:
	(cd gateways && ./summary.sh) && npm run format:md