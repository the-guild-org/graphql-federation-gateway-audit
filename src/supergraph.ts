import { composeServices } from "@apollo/composition";
import { parse } from "graphql";
import type { createRouter } from "fets";
import { Response } from "fets";
import type { createSubgraph } from "./subgraph";

export function getSupergraph(
  subgraphs: Array<{
    name: string;
    url: string;
    typeDefs: string;
  }>
) {
  const result = composeServices(
    subgraphs.map((subgraph) => ({
      name: subgraph.name,
      typeDefs: parse(subgraph.typeDefs),
      url: subgraph.url,
    }))
  );

  if (!result.supergraphSdl) {
    result.errors?.forEach((error) => console.error(error.message));
    throw new Error("Failed to compose supergraph");
  }

  return result.supergraphSdl;
}

export function serve(
  id: string,
  subgraphs: Array<ReturnType<typeof createSubgraph>>,
  tests: Array<{
    query: string;
    expectedResult: any;
  }>
) {
  return {
    id,
    createRoutes(router: ReturnType<typeof createRouter>) {
      for (const subgraph of subgraphs) {
        subgraph.createRoutes(id, router);
      }

      function serveSupergraph(baseUrl: string) {
        const supergraph = getSupergraph(
          subgraphs.map((subgraph) => ({
            name: subgraph.name,
            typeDefs: subgraph.typeDefs,
            url: `${baseUrl}/${id}/${subgraph.name}`,
          }))
        );
        return new Response(supergraph, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      router.route({
        method: "GET",
        path: `/${id}/supergraph`,
        tags: [id],
        description: "Supergraph SDL endpoint",
        operationId: "supergraph",
        schemas: {
          responses: {
            200: {
              type: "string",
            },
          },
        },
        handler(req) {
          return serveSupergraph(req.parsedUrl.origin);
        },
      });

      router.route({
        method: "GET",
        path: `/${id}/supergraph.graphql`,
        tags: [id],
        description: "Supergraph SDL endpoint",
        operationId: "supergraph.graphql",
        schemas: {
          responses: {
            200: {
              type: "string",
            },
          },
        },
        handler(req) {
          return serveSupergraph(req.parsedUrl.origin);
        },
      });

      router.route({
        method: "GET",
        path: `/${id}/tests`,
        tags: [id],
        description: "Endpoint with a list of tests",
        operationId: "tests",
        schemas: {
          responses: {
            200: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  query: { type: "string" },
                  expectedResult: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: false,
                required: ["query", "expectedResult"],
              },
            },
          },
        },
        handler() {
          return Response.json(tests);
        },
      });

      return id;
    },
  };
}
