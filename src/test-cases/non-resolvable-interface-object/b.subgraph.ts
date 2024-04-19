import { createSubgraph } from "../../subgraph";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@interfaceObject"]
      )

    type Node @key(fields: "id", resolvable: false) @interfaceObject {
      id: ID!
      field: String
    }

    type Query {
      b: Node
    }
  `,
  resolvers: {
    Query: {
      b() {
        return { __typename: "Node", id: "n1" };
      },
    },
    Node: {
      __resolveReference() {
        throw new Error("Not resolvable");
      },
    },
    field() {
      return "foo";
    },
  },
});
