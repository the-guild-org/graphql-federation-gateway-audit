import { createRouter, Response } from "fets";
import { parse } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { createYoga } from "graphql-yoga";
import { env } from "./env.js";

export function createSubgraph(
  name: string,
  schemaParameters: {
    typeDefs: string;
    resolvers: any;
  },
) {
  let schema: ReturnType<typeof buildSubgraphSchema>;

  function lazySchema() {
    if (!schema) {
      schema = buildSubgraphSchema({
        typeDefs: parse(schemaParameters.typeDefs),
        resolvers: schemaParameters.resolvers,
      });
    }

    return schema;
  }

  function lazyYoga() {
    if (!yoga) {
      yoga = createYoga({
        schema: lazySchema(),
        graphqlEndpoint: "*",
        logging: false,
      });
    }

    return yoga;
  }

  let yoga: ReturnType<typeof createYoga>;

  return {
    createRoutes(testCaseId: string, router: ReturnType<typeof createRouter>) {
      router.route({
        method: "GET",
        path: `/${testCaseId}/${name}`,
        tags: [testCaseId],
        operationId: "GraphiQL",
        schemas: {
          request: {
            query: {
              type: "object",
              properties: {
                query: { type: "string" },
              },
              additionalProperties: true,
              required: ["query"],
            },
          },
        },
        handler(req) {
          return lazyYoga()(req, { env }) as Promise<Response>;
        },
      });

      router.route({
        method: "POST",
        path: `/${testCaseId}/${name}`,
        tags: [testCaseId],
        operationId: `"${name}" subgraph`,
        description: "GraphQL endpoint for the subgraph",
        schemas: {
          request: {
            json: {
              type: "object",
              properties: {
                query: { type: "string" },
                variables: { type: "object" },
              },
              additionalProperties: true,
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
        handler(req) {
          return lazyYoga()(req, { env }) as Promise<any>;
        },
      });
    },
    name,
    typeDefs: schemaParameters.typeDefs,
  };
}
