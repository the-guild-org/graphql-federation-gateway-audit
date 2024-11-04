# Federation-Compatible Gateway Implementations

This repository contains a set of tests to evaluate and compare the compatibility of different GraphQL gateways with Apollo Federation.

[🌐 See the results of our audit](https://the-guild.dev/graphql/hive/federation-gateway-audit)

[📖 Read more about our methodology and why we created this audit](https://the-guild.dev/graphql/hive/federation-gateway-audit#manifesto)

<!-- gateways:start -->

|                             Gateway                             | Compatibility |  Test Cases  | Test Suites |
| :-------------------------------------------------------------: | :-----------: | :----------: | :---------: |
| [Hive Gateway](https://the-guild.dev/graphql/hive/docs/gateway) |    100.00%    |    🟢 171    |    🟢 41    |
|         [Apollo Router](https://www.apollographql.com/)         |    97.66%     | 🟢 167 ❌ 4  | 🟢 39 ❌ 2  |
|        [Apollo Gateway](https://www.apollographql.com/)         |    97.08%     | 🟢 166 ❌ 5  | 🟢 38 ❌ 3  |
|             [Cosmo Router](https://wundergraph.com)             |    72.51%     | 🟢 124 ❌ 47 | 🟢 19 ❌ 22 |
|            [Grafbase Gateway](https://grafbase.com)             |    60.82%     | 🟢 104 ❌ 67 | 🟢 19 ❌ 22 |
|                [Inigo Gateway](https://inigo.io)                |    46.78%     | 🟢 80 ❌ 91  | 🟢 12 ❌ 29 |

<!-- gateways:end -->

[See the full report](./REPORT.md)

## Apollo Federation Coverage

The tests are based on the Apollo Federation specification and cover the following directives:

- `@interfaceObject`
- `@key`
- `@external`
- `@provides`
- `@requires`
- `@extends`
- `@inaccessible`
- `@shareable`
- `@skip`
- `@include`
- `@composeDirective`
- `@override`

**Out of scope (limited by Enterprise license of Apollo Router):**

We are not able to test the following directives on Apollo Router due to the limitations of the Enterprise license:

- `@authenticated`
- `@policy`
- `@requiresScopes`
- `@override(label:)`

We plan to test these directives as soon as we have access to the Enterprise license.

---

## CLI

> TODO: we're working on a CLI to make it easier to run the tests, stay tuned!

---

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

make test-grafbase-gateway
make test-cosmo-router
make test-hive-gateway
make test-apollo-router
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
