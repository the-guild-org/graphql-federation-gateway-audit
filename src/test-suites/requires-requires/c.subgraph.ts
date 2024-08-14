import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("c", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@requires"]
      )

    type Product @key(fields: "id") {
      id: ID!
      price: Float! @external
      isExpensive: Boolean! @requires(fields: "price")
      hasDiscount: Boolean! @external
      isExpensiveWithDiscount: Boolean! @requires(fields: "hasDiscount")
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string } | { id: string; price: number } | { id: string; hasDiscount: boolean }) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        if ("price" in key) {
          return {
            id: product.id,
            price: key.price,
            isExpensive: key.price > 500,
          };
        }

        if ("hasDiscount" in key) {
          return {
            id: product.id,
            hasDiscount: key.hasDiscount,
            isExpensiveWithDiscount: key.hasDiscount,
          };
        }

        return {
          id: product.id,
        };
      },
    },
  },
});
