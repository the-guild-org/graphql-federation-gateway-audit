import { createSubgraph, waitFor } from "../../subgraph.js";
import { product } from "./data.js";

export default createSubgraph("price", {
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
      price: Price! @requiresScopes(scopes: [["price"], ["all"]])
    }

    type Price {
      id: ID!
      amount: Int!
      currency: String!
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
