import { createRouter, Response } from "fets";
import { parse } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { createYoga } from "graphql-yoga";
import { Env } from "./env";

export function createSubgraph(
  name: string,
  schemaParameters: {
    typeDefs: string;
    resolvers: any;
  }
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
      });
    }

    return yoga;
  }

  let yoga: ReturnType<typeof createYoga>;

  return {
    createRoutes(
      testCaseId: string,
      router: ReturnType<typeof createRouter>,
      env: Env
    ) {
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
        async handler(req) {
          return lazyYoga().fetch(req, { env }) as Promise<Response>;
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
        async handler(req) {
          const bodyAsString = JSON.stringify(
            await req.clone().json(),
            null,
            2
          );

          return (lazyYoga().fetch(req, { env }) as Promise<any>).then(
            (response) => {
              response
                .clone()
                .json()
                .then((res: Response) => {
                  console.log(
                    [
                      "\n",
                      "Subgraph: " + name,
                      "Request:",
                      bodyAsString,
                      "Response:",
                      JSON.stringify(res, null, 2),
                    ].join("\n")
                  );
                });
              return response;
            }
          );
        },
      });
    },
    name,
    typeDefs: schemaParameters.typeDefs,
  };
}
