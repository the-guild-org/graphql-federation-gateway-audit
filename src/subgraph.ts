import { Hono } from "hono";
import { parse, execute } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";

export function createSubgraph(
  name: string,
  schemaParameters: {
    typeDefs: string;
    resolvers: any;
  }
) {
  const router = new Hono();

  const schema = buildSubgraphSchema({
    typeDefs: parse(schemaParameters.typeDefs),
    resolvers: schemaParameters.resolvers,
  });

  router.post(`/${name}`, async (c) => {
    const input: {
      query: string;
      variables?: Record<string, any>;
    } = await c.req.json();

    const result = await Promise.resolve(
      execute({
        schema,
        document: parse(input.query),
        variableValues: input.variables,
      })
    );

    return c.json(result);
  });

  router.get(`/${name}`, async (c) => {
    const query = c.req.query("query");

    if (!query) {
      return c.text("No query provided");
    }

    const result = await Promise.resolve(
      execute({
        schema,
        document: parse(query),
        variableValues: {},
      })
    );

    return c.json(result);
  });

  return {
    router,
    name,
    typeDefs: schemaParameters.typeDefs,
  };
}
