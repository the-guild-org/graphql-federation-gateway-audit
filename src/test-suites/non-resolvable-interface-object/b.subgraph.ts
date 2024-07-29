import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

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

    interface Product @key(fields: "id") {
      id: ID!
    }

    type Bread implements Product @key(fields: "id") {
      id: ID!
      name: String!
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
      field() {
        return "foo";
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        return products.find((p) => p.id === key.id);
      },
    },
    Bread: {
      __resolveReference(key: { id: string }) {
        return products.find((p) => p.id === key.id);
      },
    },
  },
});
