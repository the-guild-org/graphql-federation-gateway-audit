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

## Example of running the tests against the provided gateway

1. Start the subgraphs: `$ npm run dev`
2. Start the gateway: `$ npm run gateway union-intersection`
3. Run the tests: `$ npm run test union-intersection`
