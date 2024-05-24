import { createSubgraph } from "../../subgraph";
import { products } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    type Query {
      productInA: Product
    }

    type Product @key(fields: "id") {
      id: ID!
      name: String
      pid: ID
    }
  `,
  resolvers: {
    Query: {
      productInA() {
        return {
          id: products[0].id,
          name: products[0].name,
          pid: products[0].pid,
        };
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        if (products[0].id !== key.id) {
          return null;
        }

        return {
          id: products[0].id,
          name: products[0].name,
          pid: products[0].pid,
        };
      },
    },
  },
});
