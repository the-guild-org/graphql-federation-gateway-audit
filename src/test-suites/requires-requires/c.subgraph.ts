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
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string } | { id: string; price: number }) {
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

        return {
          id: product.id,
        };
      },
    },
  },
});
