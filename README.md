# Apollo Federation Compatibility Checker

This repository contains a set of tests and a tool to evaluate and compare the compatibility of different GraphQL gateways with Apollo Federation.

<!-- gateways:start -->

|                             Gateway                             | Compatibility |  Test Cases  | Test Suites |
| :-------------------------------------------------------------: | :-----------: | :----------: | :---------: |
|         [Apollo Router](https://www.apollographql.com/)         |    100.00%    |    🟢 162    |    🟢 39    |
|       [GraphQL Mesh](https://the-guild.dev/graphql/mesh)        |    100.00%    |    🟢 162    |    🟢 39    |
| [Apollo Router (Rust-based QP)](https://www.apollographql.com/) |    96.30%     | 🟢 156 ❌ 6  | 🟢 37 ❌ 2  |
|             [Cosmo Router](https://wundergraph.com)             |    63.58%     | 🟢 103 ❌ 59 | 🟢 18 ❌ 21 |
|            [Grafbase Gateway](https://grafbase.com)             |    46.91%     | 🟢 76 ❌ 86  | 🟢 13 ❌ 26 |

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
