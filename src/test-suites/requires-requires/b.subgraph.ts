import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Query {
      product: Product
    }

    type Product @key(fields: "id") {
      id: ID!
      hasDiscount: Boolean!
    }
  `,
  resolvers: {
    Query: {
      product() {
        return {
          id: products[0].id,
          hasDiscount: products[0].hasDiscount,
        };
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          hasDiscount: product.hasDiscount,
        };
      },
    },
  },
});
