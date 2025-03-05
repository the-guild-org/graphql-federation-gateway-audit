import { createSubgraph } from "../../subgraph.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable"]
      )

    interface Node {
      id: ID!
    }

    type Query {
      node(id: ID!): Node @shareable
    }
  `,
  resolvers: {},
});
