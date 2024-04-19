# Federation Compatibility Checker

A set of subgraphs that are used to check the gateway.

## Running the subgraphs

```bash
npm install
npm run dev
```

## Configuring the gateway

All of them are configured in different ways, but one thing they need is the supergraph SDL.

To get the supergraph, visit `http://localhost:4200/<id>/supergraph` and copy the SDL.

## Running the tests

Provide these environment variables to run the tests:

- `BASE_URL` pointing to server that runs the subgraphs. (default: `http://localhost:4200`)
- `GATEWAY_URL` pointing to the gateway. (default: `http://localhost:4000`)

```bash
BASE_URL=... GATEWAY_URL=... npm run test <id>
```

## Example of running all tests locally

1. Start the subgraphs: `$ npm run dev`
2. Start the gateway: `$ npm run gateway`
3. Run the tests: `$ npm run test-all`

---

## Specification

### OpenAPI

```
https://federation-compatibility.the-guild.dev
```

#### List of test-suite ids

```
https://federation-compatibility.the-guild.dev/supergraphs
```

#### List of tests

```
https://federation-compatibility.the-guild.dev/tests
```

#### List of supergraphs

```
https://federation-compatibility.the-guild.dev/supergraphs
```

### `/tests` response

```js
[
  {
    query: "query { ... }",
    expected: {
      data: any, // optional
      errors: boolean, // whether the response should contain an error (default: false, optional)
    },
  },
];
```
