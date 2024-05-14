import { createSubgraph } from "../../subgraph";
import { products } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Query {
      product: Product
    }

    type Product @key(fields: "id") {
      id: ID!
      price: Float!
    }
  `,
  resolvers: {
    Query: {
      product() {
        return {
          id: products[0].id,
          price: products[0].price,
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
          price: product.price,
        };
      },
    },
  },
});
