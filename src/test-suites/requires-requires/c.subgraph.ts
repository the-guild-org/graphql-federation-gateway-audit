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
      __resolveReference(key: {
        id: string;
        price?: number;
        hasDiscount?: boolean;
      }) {
        if (!products.find((product) => product.id === key.id)) {
          return null;
        }

        const product: {
          __typename: "Product";
          id: string;
          price?: number;
          isExpensive?: boolean;
          hasDiscount?: boolean;
          isExpensiveWithDiscount?: boolean;
        } = {
          __typename: "Product",
          id: key.id,
        };

        if (typeof key.price === "number") {
          product.price = key.price;
          product.isExpensive = key.price > 500;
        } else if ("price" in key && typeof key.price !== "undefined") {
          return new GraphQLError("Product.price must be a number");
        }

        if (typeof key.hasDiscount === "boolean") {
          product.hasDiscount = key.hasDiscount;
          product.isExpensiveWithDiscount = !key.hasDiscount;
        } else if (
          "hasDiscount" in key &&
          typeof key.hasDiscount !== "undefined"
        ) {
          return new GraphQLError("Product.hasDiscount must be a number");
        }

        return product;
      },
    },
  },
});
