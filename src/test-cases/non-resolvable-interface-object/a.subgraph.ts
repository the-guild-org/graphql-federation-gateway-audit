import { createSubgraph } from "../../subgraph";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@interfaceObject"]
      )

    interface Node @key(fields: "id") {
      id: ID!
    }

    type Query {
      a: Node
    }
  `,
  resolvers: {
    Query: {
      a() {
        return { __typename: "Node", id: "n1" };
      },
    },
    Node: {
      __resolveReference() {
        throw new Error("Not resolvable as it is an interface object");
      },
    },
  },
});
