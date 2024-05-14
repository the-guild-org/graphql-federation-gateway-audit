import { createSubgraph } from "../../subgraph";
import { getProducts } from "./data";

export default createSubgraph("b", {
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
      isAvailable: Boolean!
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string; price?: number }) {
        const product = getProducts().find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        if (typeof product.price === "number") {
          return {
            id: product.id,
            isAvailable: true,
            price: product.price,
          };
        }

        return {
          id: product.id,
          isAvailable: false,
        };
      },
      isExpensive(product: { price?: number }) {
        if (typeof product.price !== "number") {
          throw new Error("Price is not available");
        }

        return product.price > 100;
      },
    },
  },
});
