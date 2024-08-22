# Apollo Federation Compatibility Checker

This repository contains a set of tests and a tool to evaluate and compare the compatibility of different GraphQL gateways with Apollo Federation.

<!-- gateways:start -->

|                           Gateway                           | Compatibility |  Test Cases  | Test Suites |
| :---------------------------------------------------------: | :-----------: | :----------: | :---------: |
|       [Apollo Router](https://www.apollographql.com/)       |    97.65%     | 🟢 166 ❌ 4  | 🟢 38 ❌ 2  |
|     [GraphQL Mesh](https://the-guild.dev/graphql/mesh)      |    97.65%     | 🟢 166 ❌ 4  | 🟢 39 ❌ 1  |
|      [Apollo Gateway](https://www.apollographql.com/)       |    97.06%     | 🟢 165 ❌ 5  | 🟢 37 ❌ 3  |
| [Apollo Router (native QP)](https://www.apollographql.com/) |    93.53%     | 🟢 159 ❌ 11 | 🟢 36 ❌ 4  |
|           [Cosmo Router](https://wundergraph.com)           |    62.35%     | 🟢 106 ❌ 64 | 🟢 18 ❌ 22 |
|          [Grafbase Gateway](https://grafbase.com)           |    44.71%     | 🟢 76 ❌ 94  | 🟢 12 ❌ 28 |

<!-- gateways:end -->

[See the full report](./REPORT.md)

## Apollo Federation Coverage

The tests are based on the Apollo Federation specification and cover the following directives:

- @interfaceObject
- @key
- @external
- @provides
- @requires
- @extends
- @inaccessible
- @shareable
- @skip
- @include
- @composeDirective
- @override

**Out of scope (limited by Enterprise license of Apollo Router):**

We are not able to test the following directives on Apollo Router due to the limitations of the Enterprise license:

- @authenticated
- @policy
- @requiresScopes
- @override(label:)

We plan to test these directives as soon as we have access to the Enterprise license.

---

## CLI

> TODO

## Instructions

First of all, you need to install and prepare the gateways. You can do this by running the following command:

```bash
make install
```

> [!IMPORTANT]  
> Be aware that `Node` and `npm` are required to run the whole setup.

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

### Running a gateway for a single test suite

In case you want to run only a limited set of tests, you can do so by running the following command:

```bash
make test-suite-[name of the gateway] TEST_SUITE=[id of the test suite]
```

### Running a gateway for a specific supergraph

There's also the possibility to start a gateway for a selected supergraph, in case you want to run the queries yourself.

```bash
make run-[name of the gateway] TEST_SUITE=[id of the test suite]
```

## Contributing or adding a new gateway

[See the contributing guide](./.github/CONTRIBUTING.md)
