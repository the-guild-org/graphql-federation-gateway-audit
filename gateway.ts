/**
 * $ npm run gateway <id>
 */

import { ApolloGateway } from "@apollo/gateway";
import { serializeQueryPlan } from "@apollo/query-planner";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:4200";
const [, , id] = process.argv;

if (!id) {
  console.error("Usage: npm run gateway <id>");
  process.exit(1);
}

async function fetchSupergraph() {
  const url = `${BASE_URL}/${id}/supergraph`;
  const response = await fetch(url);
  return response.text();
}

const supergraphSdl = await fetchSupergraph();
const gateway = new ApolloGateway({
  supergraphSdl,
  experimental_didResolveQueryPlan(options) {
    if (options.requestContext.operationName !== "IntrospectionQuery") {
      console.log("\n-----\n");
      console.log(options.requestContext.source);
      console.log("\n -> \n");
      console.log(serializeQueryPlan(options.queryPlan));
    }
  },
});

const apollo = new ApolloServer({
  gateway,
});

await startStandaloneServer(apollo, {
  listen: {
    port: 4000,
  },
});
console.info("Server is running on http://localhost:4000/graphql");
