import { createSubgraph } from "../subgraph";
import { products } from "./data";

export default createSubgraph("link", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

    type Product @key(fields: "id") @key(fields: "id pid") {
      id: String!
      pid: String!
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(
        key:
          | {
              id: string;
              pid: string;
            }
          | {
              id: string;
            }
      ) {
        if ("pid" in key) {
          return products.find(
            (product) => product.id === key.id && product.pid === key.pid
          );
        }

        return products.find((product) => product.id === key.id);
      },
    },
  },
});
