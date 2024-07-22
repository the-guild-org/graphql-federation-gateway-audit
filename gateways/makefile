BASE_URL := $(or $(BASE_URL), "http://localhost:4200")
TESTS := $(or $(TESTS), "")

install:
	@for dir in ./*; do \
		if [ -d $$dir ]; then \
			echo "Installing $$dir"; \
			(cd $$dir && ./install.sh); \
			echo "\n"; \
		fi; \
	done

subgraphs:
	(cd .. && npm run dev)

test-cosmo:
	./run-all.sh $(BASE_URL) cosmo http://127.0.0.1:4000/graphql http://127.0.0.1:4000/health 5s $(TESTS)
run-cosmo:
	(cd cosmo && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-grafbase:
	./run-all.sh $(BASE_URL) grafbase http://127.0.0.1:4000/graphql http://127.0.0.1:4000/health 5s $(TESTS)
run-grafbase:
	(cd grafbase && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-mesh:
	./run-all.sh $(BASE_URL) mesh http://127.0.0.1:4000/graphql http://127.0.0.1:4000/healthcheck 30s $(TESTS)
run-mesh:
	(cd mesh && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-router:
	./run-all.sh $(BASE_URL) router http://127.0.0.1:4000/ http://127.0.0.1:8088/health 5s $(TESTS)
run-router:
	(cd router && ./run.sh "$(BASE_URL)/$(TEST)/supergraph")

test-all: test-router test-mesh test-grafbase test-cosmo summary

summary:
	./summary.sh