import { createRouter, Response } from "fets";
import { parse, execute } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";

export function createSubgraph(
  name: string,
  schemaParameters: {
    typeDefs: string;
    resolvers: any;
  }
) {
  const schema = buildSubgraphSchema({
    typeDefs: parse(schemaParameters.typeDefs),
    resolvers: schemaParameters.resolvers,
  });

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
        async handler(req) {
          const result = await Promise.resolve(
            execute({
              schema,
              document: parse(req.query.query),
              variableValues: {},
            })
          );

          return Response.json(result);
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
          const input = await req.json();

          const result = await Promise.resolve(
            execute({
              schema,
              document: parse(input.query),
              variableValues: input.variables,
            })
          );

          return Response.json(result as any);
        },
      });
    },
    name,
    typeDefs: schemaParameters.typeDefs,
  };
}
