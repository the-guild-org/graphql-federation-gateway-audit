import { createSubgraph, waitFor } from "../../subgraph.js";
import { product } from "./data.js";

export default createSubgraph("name", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key", "@shareable", "@authenticated"]
      )

    type Query {
      product: Product! @shareable
      products: [Product!]! @shareable
    }

    type Product {
      id: ID! @shareable
      name: Name! @authenticated
    }

    type Name {
      id: ID!
      brand: String!
      model: String!
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
