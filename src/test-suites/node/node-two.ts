import { createSubgraph } from "../../subgraph.js";
import { categories, products } from "./data.js";

export default createSubgraph("node-two", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    interface Node {
      id: ID!
    }

    type Product implements Node @key(fields: "id") {
      id: ID!
    }

    type Category implements Node @key(fields: "id") {
      id: ID!
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string }) {
        const product = products.find((p) => p.id === key.id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
        };
      },
    },
    Category: {
      __resolveReference(key: { id: string }) {
        const cat = categories.find((c) => c.id === key.id);

        if (!cat) {
          return null;
        }

        return {
          id: cat.id,
        };
      },
    },
  },
});
