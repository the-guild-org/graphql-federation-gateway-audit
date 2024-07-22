import { createSubgraph } from "../../subgraph";
import { product, punishPoorPlans } from "./data";

export default createSubgraph("category", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      product: Product @shareable
      products: [Product] @shareable
    }

    type Product {
      id: ID! @shareable
      category: String @shareable
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
