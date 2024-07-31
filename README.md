# Apollo Federation Compatibility Checker

This repository contains a set of tests and a tool to evaluate and compare the compatibility of different GraphQL gateways with Apollo Federation.

<!-- gateways:start -->

|            Gateway            | Compatibility |  Test Cases  | Test Suites |
| :---------------------------: | :-----------: | :----------: | :---------: |
|         Apollo Router         |    100.00%    |    🟢 161    |    🟢 38    |
|         GraphQL Mesh          |    100.00%    |    🟢 161    |    🟢 38    |
| Apollo Router (Rust-based QP) |    95.65%     | 🟢 154 ❌ 7  | 🟢 35 ❌ 3  |
|         Cosmo Router          |    65.84%     | 🟢 106 ❌ 55 | 🟢 19 ❌ 19 |
|       Grafbase Gateway        |    46.58%     | 🟢 75 ❌ 86  | 🟢 12 ❌ 26 |

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
