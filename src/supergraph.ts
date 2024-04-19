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
    expected: any;
  }>
) {
  return {
    id,
    createRoutes(router: ReturnType<typeof createRouter>, isDev: boolean) {
      let subgraphNames = new Set<string>();
      for (const subgraph of subgraphs) {
        if (subgraphNames.has(subgraph.name)) {
          throw new Error(`Duplicate subgraph name ${subgraph.name}`);
        }

        subgraphNames.add(subgraph.name);
        subgraph.createRoutes(id, router);
      }

      async function serveSupergraph(request: { url: string; parsedUrl: URL }) {
        const cache = await caches.open("supergraph");
        const cached = await cache.match(request.url);

        if (!isDev && cached) {
          return cached as Response<any, Record<string, string>, 200>;
        }

        const supergraph = getSupergraph(
          subgraphs.map((subgraph) => ({
            name: subgraph.name,
            typeDefs: subgraph.typeDefs,
            url: `${request.parsedUrl.origin}/${id}/${subgraph.name}`,
          }))
        );

        const response = new Response(supergraph, {
          status: 200,
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=60",
          },
        });

        await cache.put(request.url, response.clone());

        return response;
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
          return serveSupergraph(req);
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
          return serveSupergraph(req);
        },
      });

      router.route({
        method: "GET",
        path: `/${id}/subgraphs`,
        tags: [id],
        description: "A list of subgraphs with their SDLs, URLs and names",
        operationId: "subgraphs",
        schemas: {
          responses: {
            200: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  url: { type: "string" },
                  sdl: { type: "string" },
                },
                required: ["name", "url", "sdl"],
              },
            },
          },
        },
        handler(req) {
          return Response.json(
            subgraphs.map((subgraph) => ({
              name: subgraph.name,
              sdl: subgraph.typeDefs,
              url: `${req.parsedUrl.origin}/${id}/${subgraph.name}`,
            }))
          );
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
                  expected: {
                    type: "object",
                    properties: {
                      data: {
                        anyOf: [
                          { type: "object" },
                          {
                            type: "null",
                          },
                        ],
                      },
                      errors: {
                        type: "boolean",
                        description: "Indicates that errors are expected",
                        default: false,
                      },
                    },
                    additionalProperties: false,
                  },
                },
                additionalProperties: false,
                required: ["query", "expected"],
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
