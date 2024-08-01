import { createSubgraph } from "../../subgraph.js";
import { categories, products } from "./data.js";

export default createSubgraph("types", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    interface Node {
      id: ID!
    }

    type Product implements Node @key(fields: "id") @shareable {
      id: ID!
      name: String!
      price: Float!
    }

    type Category implements Node @key(fields: "id") {
      id: ID!
      name: String!
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
          name: product.name,
          price: product.price,
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
          name: cat.name,
        };
      },
    },
  },
});
