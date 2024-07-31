BASE_URL := $(or $(BASE_URL), "http://localhost:4200")
TEST_SUITE := $(or $(TEST_SUITE), "")
REPORTER := $(or $(REPORTER), "dot")
GATEWAYS_DIR := $(wildcard ./gateways/*)
GATEWAY_IDS := $(notdir $(GATEWAYS_DIR))

define TEST_GATEWAY
test-$(1):
	npm start -- test --cwd ./gateways/$(1) --run-script ./run.sh --reporter $(REPORTER) --graphql $(shell jq -r .graphql ./gateways/$(1)/gateway.json) --healthcheck $(shell jq -r .health ./gateways/$(1)/gateway.json)
endef

define TEST_SUITE_GATEWAY
test-suite-$(1):
	npm start -- test-suite --test $(TEST_SUITE) --cwd ./gateways/$(1) --run-script ./run.sh --graphql $(shell jq -r .graphql ./gateways/$(1)/gateway.json) --healthcheck $(shell jq -r .health ./gateways/$(1)/gateway.json)
endef

define RUN_GATEWAY
run-$(1):
	(cd gateways/$(1) && ./run.sh $(TEST_SUITE))
endef

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
	npm start -- serve

# Generate the test and run targets for each gateway
$(foreach gateway,$(GATEWAY_IDS),$(eval $(call TEST_GATEWAY,$(gateway))))
$(foreach gateway,$(GATEWAY_IDS),$(eval $(call RUN_GATEWAY,$(gateway))))
$(foreach gateway,$(GATEWAY_IDS),$(eval $(call TEST_SUITE_GATEWAY,$(gateway))))

test-all: $(addprefix test-,$(GATEWAY_IDS)) summary

summary:
	npm run summary