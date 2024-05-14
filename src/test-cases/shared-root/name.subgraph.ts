import { createSubgraph } from "../../subgraph";
import { product, punishNonPerformantPlans } from "./data";

export default createSubgraph("name", {
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
      name: String
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
    },
    Product: {
      __resolveReference(key: { id: string }) {
        if (punishNonPerformantPlans) {
          throw new Error("You should be using the categories subgraph!");
        }

        if (key.id !== product.id) {
          return null;
        }

        return {
          id: product.id,
          name: product.name,
        };
      },
    },
  },
});
