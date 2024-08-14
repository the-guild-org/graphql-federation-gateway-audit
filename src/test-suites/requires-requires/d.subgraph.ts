import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("d", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@requires"]
      )

    type Product @key(fields: "id") {
      id: ID!
      isExpensive: Boolean! @external
      canAfford: Boolean! @requires(fields: "isExpensive")
      isExpensiveWithDiscount: Boolean! @external
      canAffordWithDiscount: Boolean!
        @requires(fields: "isExpensiveWithDiscount")
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(
        key:
          | {
              id: string;
              isExpensive: boolean;
              isExpensiveWithDiscount: boolean;
            }
          | { id: string; isExpensive: boolean }
          | { id: string; isExpensiveWithDiscount: boolean }
          | { id: string }
      ) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        if ("isExpensive" in key && "isExpensiveWithDiscount" in key) {
          return {
            id: product.id,
            isExpensive: key.isExpensive,
            canAfford: !key.isExpensive,
            isExpensiveWithDiscount: key.isExpensiveWithDiscount,
            canAffordWithDiscount: !key.isExpensiveWithDiscount,
          };
        }

        if ("isExpensive" in key) {
          return {
            id: product.id,
            isExpensive: key.isExpensive,
            canAfford: !key.isExpensive,
          };
        }

        if ("isExpensiveWithDiscount" in key) {
          return {
            id: product.id,
            isExpensiveWithDiscount: key.isExpensiveWithDiscount,
            canAffordWithDiscount: !key.isExpensiveWithDiscount,
          };
        }

        return {
          id: product.id,
        };
      },
    },
  },
});
