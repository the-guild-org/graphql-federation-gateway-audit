import { shouldPunishForPoorPlans } from "../../env";
import { createSubgraph } from "../../subgraph";
import { products } from "./data";

// I deliberately name it all-products to make sure it's first in the list of subgraphs (in case the order matters)
export default createSubgraph("all-products", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      products: [Product] @shareable
    }

    type Product @key(fields: "id") {
      id: ID!
    }
  `,
  resolvers: {
    Query: {
      products(_p: unknown, _a: unknown, context: any) {
        if (shouldPunishForPoorPlans(context)) {
          throw new Error("You should be using the categories subgraph!");
        }
        return products.map((p) => ({ id: p.id }));
      },
    },
    Product: {
      __resolveReference(key: { id: string }, context: any) {
        if (shouldPunishForPoorPlans(context)) {
          throw new Error("You should be using the categories subgraph!");
        }

        const product = products.find((p) => p.id === key.id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
        };
      },
    },
  },
});
