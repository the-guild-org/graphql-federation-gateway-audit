/**
 * $ npm run gateway
 */

import { ApolloGateway } from "@apollo/gateway";
import { getOperationAST, print, printSchema } from "graphql";
import { createServer } from "node:http";
import { createRouter, Response } from "fets";
import { getDocumentString, Plugin } from "@envelop/core";
import { serializeQueryPlan } from "@apollo/query-planner";
import { createYoga } from "graphql-yoga";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:4200";

async function fetchSupergraphList() {
  const url = BASE_URL + "/supergraphs";
  const response = await fetch(url);
  const links = (await response.json()) as string[];

  return links.map((link) => ({
    id: link.replace(BASE_URL + "/", "").replace("/supergraph", ""),
    supergraph: link,
  }));
}

async function fetchSupergraph(endpoint: string) {
  const response = await fetch(endpoint);
  return await response.text();
}

const router = createRouter();

router.route({
  method: "GET",
  path: "/_health",
  handler() {
    return new Response("OK");
  },
});

const list = await fetchSupergraphList();

for await (const { id, supergraph } of list) {
  const supergraphSdl = await fetchSupergraph(supergraph);
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

  const yoga = createYoga({
    plugins: [useApolloFederation(gateway)],
    graphqlEndpoint: `/${id}`,
    maskedErrors: false
  });

  console.log(`Serving http://localhost:4000/${id}`);

  router.route({
    method: "GET",
    path: `/${id}`,
    handler(req, res) {
      return yoga.fetch(req as any, res as any) as any;
    },
  });

  router.route({
    method: "POST",
    path: `/${id}`,
    schemas: {
      request: {
        json: {
          type: "object",
          properties: {
            query: { type: "string" },
            variables: { type: "object" },
            operationName: { type: "string" },
          },
          required: ["query"],
        },
      },
      responses: {
        200: {
          type: "object",
          properties: {
            data: { type: "object" },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
                required: ["message"],
                additionalProperties: false,
              },
            },
          },
          required: ["data"],
          additionalProperties: false,
        },
      },
    },
    handler(req, res) {
      return yoga.fetch(req as any, res as any) as any;
    },
  });
}

router.route({
  path: "*",
  handler: () => new Response("Not found", { status: 404 }),
});

const server = createServer(router);

process.on("SIGTERM", async () => {
  console.log("Shutting down...");
  await new Promise<void>((resolve) =>
    server.close((error) => {
      if (error) {
        console.error(error);
      }
      resolve();
    })
  );
  console.log("Server is down");
  process.exit(0);
});

server.listen(4000, () => {
  console.log("Swagger UI is available at http://localhost:4000/docs");
  console.info("Server is running on http://localhost:4000/");
});

function useApolloFederation(gateway: ApolloGateway): Plugin {
  let schemaHash: any;
  return {
    onPluginInit({ setSchema }) {
      if (gateway.schema) {
        setSchema(gateway.schema);
      } else {
        gateway.load();
      }
      gateway.onSchemaLoadOrUpdate(
        ({ apiSchema, coreSupergraphSdl = printSchema(apiSchema) }) => {
          setSchema(apiSchema);
          schemaHash = coreSupergraphSdl || printSchema(apiSchema);
        }
      );
    },
    onExecute({ args, setExecuteFn }) {
      const documentStr = getDocumentString(args.document, print);
      const operation = getOperationAST(
        args.document,
        args.operationName ?? undefined
      );
      if (!operation) {
        throw new Error(
          `Operation ${
            args.operationName || ""
          } cannot be found in ${documentStr}`
        );
      }
      setExecuteFn(function federationExecutor() {
        return gateway.executor({
          document: args.document,
          request: {
            query: documentStr,
            operationName: args.operationName ?? undefined,
            variables: args.variableValues ?? undefined,
          },
          overallCachePolicy: {
            maxAge: undefined,
            scope: undefined,
            restrict() {
              this.maxAge = undefined;
              this.scope = undefined;
            },
            replace() {},
            policyIfCacheable() {
              return null;
            },
          },
          operationName: args.operationName ?? null,
          cache: {
            get: async () => {
              return undefined;
            },
            set: async () => {},
            delete: async () => {},
          },
          context: args.contextValue,
          queryHash: documentStr,
          logger: console,
          metrics: {},
          source: documentStr,
          operation,
          schema: args.schema,
          schemaHash,
        });
      });
    },
  };
}
