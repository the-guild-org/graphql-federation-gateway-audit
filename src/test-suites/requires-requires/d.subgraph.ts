import { GraphQLError } from "graphql";
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
      __resolveReference(key: {
        id: string;
        isExpensive?: boolean;
        isExpensiveWithDiscount?: boolean;
      }) {
        if (!products.find((product) => product.id === key.id)) {
          return null;
        }

        const product: {
          __typename: "Product";
          id: string;
          isExpensive?: boolean;
          canAfford?: boolean;
          isExpensiveWithDiscount?: boolean;
          canAffordWithDiscount?: boolean;
        } = {
          __typename: "Product",
          id: key.id,
        };

        if (typeof key.isExpensive === "boolean") {
          product.isExpensive = key.isExpensive;
          product.canAfford = !key.isExpensive;
        } else if (
          "isExpensive" in key &&
          typeof key.isExpensive !== "undefined"
        ) {
          return new GraphQLError("Product.isExpensive must be a boolean");
        }

        if (typeof key.isExpensiveWithDiscount === "boolean") {
          product.isExpensiveWithDiscount = key.isExpensiveWithDiscount;
          product.canAffordWithDiscount = !key.isExpensiveWithDiscount;
        } else if (
          "isExpensiveWithDiscount" in key &&
          typeof key.isExpensiveWithDiscount !== "undefined"
        ) {
          return new GraphQLError(
            "Product.isExpensiveWithDiscount must be a boolean"
          );
        }

        return product;
      },
    },
  },
});
