import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("product", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external"]
      )

    type Product @key(fields: "id") {
      id: ID!
      name: String!
    }

    type Query {
      products: [Product!]!
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string }) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          name: product.name,
        };
      },
    },
    Query: {
      products() {
        return products.map((p) => ({
          id: p.id,
          name: p.name,
        }));
      },
    },
  },
});
