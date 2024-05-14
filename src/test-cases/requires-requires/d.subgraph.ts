import { createSubgraph } from "../../subgraph";
import { products } from "./data";

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
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(
        key: { id: string } | { id: string; isExpensive: boolean }
      ) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        if ("isExpensive" in key) {
          return {
            id: product.id,
            isExpensive: key.isExpensive,
            canAfford: !key.isExpensive,
          };
        }

        return {
          id: product.id,
        };
      },
    },
  },
});
