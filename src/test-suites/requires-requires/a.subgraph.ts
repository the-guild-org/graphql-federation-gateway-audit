import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@inaccessible"]
      )

    type Product @key(fields: "id") {
      id: ID!
      price: Float! @inaccessible
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string }) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
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
