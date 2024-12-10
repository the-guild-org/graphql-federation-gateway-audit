import { createSubgraph } from "../../subgraph.js";
import { product } from "./data.js";

export default createSubgraph("category", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key", "@shareable", "@requiresScopes"]
      )

    type Query {
      product: Product! @shareable
      products: [Product!]! @shareable
    }

    type Product {
      id: ID! @shareable
      category: Category!
        @requiresScopes(scopes: [["category-name", "category-id"], ["all"]])
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
  },
});
