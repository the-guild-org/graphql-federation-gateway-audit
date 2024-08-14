import { GraphQLError } from "graphql";
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
      __resolveReference(
        key:
          | { id: string; price: number; hasDiscount: boolean }
          | { id: string; price: number }
          | { id: string; hasDiscount: boolean }
          | { id: string }
      ) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        if ("price" in key && "hasDiscount" in key) {
          if (typeof key.price !== "number") {
            return new GraphQLError("Price must be a number");
          }
          if (typeof key.hasDiscount !== "boolean") {
            return new GraphQLError("hasDiscount must be a boolean");
          }
          return {
            id: product.id,
            price: key.price,
            isExpensive: key.price > 500,
            hasDiscount: key.hasDiscount,
            isExpensiveWithDiscount: !key.hasDiscount === false,
          };
        }

        if ("price" in key) {
          if (typeof key.price !== "number") {
            return new GraphQLError("Price must be a number");
          }
          return {
            id: product.id,
            price: key.price,
            isExpensive: key.price > 500,
          };
        }

        if ("hasDiscount" in key) {
          if (typeof key.hasDiscount !== "boolean") {
            return new GraphQLError("hasDiscount must be a boolean");
          }
          return {
            id: product.id,
            hasDiscount: key.hasDiscount,
            isExpensiveWithDiscount: !key.hasDiscount,
          };
        }

        return {
          id: product.id,
        };
      },
    },
  },
});
