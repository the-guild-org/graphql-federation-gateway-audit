BASE_URL := $(or $(BASE_URL), "http://localhost:4200")
TESTS := $(or $(TESTS), "")
REPORTER := $(or $(REPORTER), "dot")

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
	npm start serve

test-cosmo:
	npm start test -- --cwd ./gateways/cosmo --run-script ./run.sh  --reporter $(REPORTER) --graphql http://127.0.0.1:4000/graphql --healthcheck http://127.0.0.1:4000/health/ready
run-cosmo:
	(cd gateways/cosmo && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-grafbase:
	npm start test -- --cwd ./gateways/grafbase --run-script ./run.sh  --reporter $(REPORTER) --graphql http://127.0.0.1:4000/graphql --healthcheck http://127.0.0.1:4000/health
run-grafbase:
	(cd gateways/grafbase && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-mesh:
	npm start test -- --cwd ./gateways/mesh --run-script ./run.sh  --reporter $(REPORTER) --graphql http://127.0.0.1:4000/graphql --healthcheck http://127.0.0.1:4000/healthcheck
run-mesh:
	(cd gateways/mesh && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-router:
	npm start test -- --cwd ./gateways/router --run-script ./run.sh  --reporter $(REPORTER) --graphql http://127.0.0.1:4000 --healthcheck http://127.0.0.1:8088/health
run-router:
	(cd gateways/router && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-router-new:
	npm start test -- --cwd ./gateways/router-new --run-script ./run.sh  --reporter $(REPORTER) --graphql http://127.0.0.1:4000 --healthcheck http://127.0.0.1:8088/health
run-router-new:
	(cd gateways/router-new && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-all: test-router test-router-new test-mesh test-grafbase test-cosmo summary

summary:
	(cd gateways && ./summary.sh) && npm run format:md