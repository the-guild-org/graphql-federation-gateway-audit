import { createSubgraph } from "../../subgraph";
import { product, punishPoorPlans } from "./data";

export default createSubgraph("price", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      product: Product @shareable
    }

    type Product @key(fields: "id") {
      id: ID!
      price: Float
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
    },
    Product: {
      __resolveReference(key: { id: string }) {
        if (punishPoorPlans) {
          throw new Error("You should be using the categories subgraph!");
        }

        if (key.id !== product.id) {
          return null;
        }

        return {
          id: product.id,
          price: product.price,
        };
      },
    },
  },
});
