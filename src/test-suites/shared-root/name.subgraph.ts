import { createSubgraph } from "../../subgraph.js";
import { product } from "./data.js";

export default createSubgraph("name", {
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
      name: String @shareable
    }
  `,
  resolvers: {
    Query: {
      product() {
        return {
          id: product.id,
          name: product.name,
        };
      },
      products() {
        return [
          {
            id: product.id,
            name: product.name,
          },
        ];
      },
    },
  },
});
