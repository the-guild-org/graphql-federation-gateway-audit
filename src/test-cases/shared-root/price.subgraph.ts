import { createSubgraph } from "../../subgraph";
import { product } from "./data";

export default createSubgraph("price", {
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
      price: Float @shareable
    }
  `,
  resolvers: {
    Query: {
      product() {
        return {
          id: product.id,
          price: product.price,
        };
      },
      products() {
        return [
          {
            id: product.id,
            price: product.price,
          },
        ];
      },
    },
  },
});
