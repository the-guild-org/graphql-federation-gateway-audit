import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("products", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Query {
      products: [Product]
    }

    type Product @key(fields: "upc") {
      upc: String!
      name: String
      price: Int
      weight: Int
    }
  `,
  resolvers: {
    Query: {
      products() {
        return products.map((p) => ({
          upc: p.upc,
          name: p.name,
          price: p.price,
          weight: p.weight,
        }));
      },
    },
    Product: {
      __resolveReference(key: { upc: string }) {
        const product = products.find((p) => p.upc === key.upc);

        if (!product) {
          return null;
        }

        return {
          upc: product.upc,
          name: product.name,
          price: product.price,
          weight: product.weight,
        };
      },
    },
  },
});
