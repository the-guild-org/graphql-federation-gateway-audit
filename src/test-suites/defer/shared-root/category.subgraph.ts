import { createSubgraph, waitFor } from "../../../subgraph.js";
import { product } from "./data.js";

export default createSubgraph("category", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      product: Product! @shareable
      products: [Product!]! @shareable
    }

    type Product {
      id: ID! @shareable
      category: Category!
    }

    type Category {
      id: ID!
      name: String!
    }
  `,
  resolvers: {
    Query: {
      product() {
        return {
          id: product.id,
          category: product.category,
        };
      },
      products() {
        return [
          {
            id: product.id,
            category: product.category,
          },
        ];
      },
    },
    Product: {
      async category(p: typeof product) {
        await waitFor(1000);
        return p.category;
      },
    },
  },
});
