# Contributing guide

1. Create a new directory in the `gateways` folder with the name of the new gateway.
2. Prepare the `install.sh` script that will install the necessary dependencies, the gateway itself.
3. Create the `run.sh` script that will start the gateway. See an example using [supergraph.graphql](../gateways/grafbase-gateway/run.sh) and [subgraphs information](../gateways/cosmo-router/run.sh).
4. Add the `gateway.json` file with the necessary information about the gateway. See an example [here](../gateways/hive-gateway/gateway.json).
5. The `.gitignore` should be created as well to avoid committing unnecessary files.
6. Execute `make test-[name of the gateway]` to test your gateway.
7. Run `make summary` to include your gateway in the results.
