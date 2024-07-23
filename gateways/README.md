# Gateway compatibility

## Instructions

First of all, you need to install and prepare the gateways. You can do this by running the following command:

```bash
make install
```

> [!IMPORTANT]  
> Be aware that `Node` and `npm` are required to run the whole setup.

After that, you can start the subgraphs.

```bash
make subgraphs
```

### Testing all gateways

You can run the tests for each gateway by running the following command:

```bash
make test-all
```

### Testing a specific gateway

You can run the tests for a specific gateway by running the following command:

```bash
make test-[name of the gateway]

make test-grafbase
make test-cosmo
make test-mesh
make test-router
```

### Running only a specific set of tests

In case you want to run only a limited set of tests, you can do so by running the following command:

```bash
# All gateways
make test-all TESTS=[comma separated list of tests]

# Specific gateway
make test-[name of the gateway] TESTS=[comma separated list of tests]
```

### Running a gateway for a specific supergraph

There's also the possibility to start a gateway for a selected supergraph, in case you want to run the queries yourself.

```bash
make run-[name of the gateway] TEST=[id of the test]
```

## Gateways

### `cosmo`

https://wundergraph.com/

```text
GraphQL endpoint:       http://127.0.0.1:4000/graphql
Health check endpoint:  http://127.0.0.1:4000/health/ready
```

### `grafbase`

https://grafbase.com/

```text
GraphQL endpoint:       http://127.0.0.1:4000/graphql
Health check endpoint:  http://127.0.0.1:4000/health
```

### `mesh`

https://the-guild.dev/graphql/mesh

```text
GraphQL endpoint:       http://127.0.0.1:4000/graphql
Health check endpoint:  http://127.0.0.1:4000/healthcheck
```

### `router`

https://www.apollographql.com/docs/router/

```text
GraphQL endpoint:       http://127.0.0.1:4000/
Health check endpoint:  http://127.0.0.1:8088/health
```
