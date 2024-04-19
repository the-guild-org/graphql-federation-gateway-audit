import { createSubgraph } from "../../subgraph";
import { products } from "./data";

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

    type Product @key(fields: "id", resolvable: false) @interfaceObject {
      id: ID!
    }

    type Query {
      a: Node
      product: Product!
    }
  `,
  resolvers: {
    Query: {
      a() {
        return { __typename: "Node", id: "n1" };
      },
      product() {
        return { __typename: "Product", id: products[0].id };
      },
    },
    Node: {
      __resolveReference() {
        throw new Error("Not resolvable as it is an interface object");
      },
    },
  },
});
