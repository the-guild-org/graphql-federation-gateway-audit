import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    interface Node {
      id: ID!
    }

    type Oven implements Node @key(fields: "id") {
      id: ID!
      warranty: Int
    }
  `,
  resolvers: {
    Oven: {
      __resolveReference(key: { id: string }) {
        const oven = products.find((p) => p.id === key.id);

        if (oven?.__typename === "Oven") {
          return {
            __typename: "Oven",
            id: oven.id,
            warranty: 1,
          };
        }

        return null;
      },
    },
  },
});
