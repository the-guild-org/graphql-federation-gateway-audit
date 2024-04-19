import { composeServices } from "@apollo/composition";
import { parse } from "graphql";
import type { Hono } from "hono";
import type { createSubgraph } from "./subgraph";
import { getBaseUrl } from "./utils";

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
  return (group: Hono) => {
    for (const subgraph of subgraphs) {
      group.route(`/${id}`, subgraph.router);
    }

    group.get(`/${id}/supergraph`, async ({ text, req }) => {
      const baseUrl = getBaseUrl(req);
      const supergraph = getSupergraph(
        subgraphs.map((subgraph) => ({
          name: subgraph.name,
          typeDefs: subgraph.typeDefs,
          url: `${baseUrl}/${id}/${subgraph.name}`,
        }))
      );
      return text(supergraph);
    });

    group.get(`/${id}/supergraph.graphql`, async ({ text, req }) => {
      const baseUrl = getBaseUrl(req);
      const supergraph = getSupergraph(
        subgraphs.map((subgraph) => ({
          name: subgraph.name,
          typeDefs: subgraph.typeDefs,
          url: `${baseUrl}/${id}/${subgraph.name}`,
        }))
      );
      return text(supergraph);
    });

    group.get(`/${id}/tests`, async ({ json }) => {
      return json(tests);
    });

    return id;
  };
}
