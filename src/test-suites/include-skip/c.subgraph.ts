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
      isExpensive: Boolean! @external
      include: Boolean! @requires(fields: "isExpensive")
      skip: Boolean! @requires(fields: "isExpensive")
      neverCalledInclude: Boolean! @requires(fields: "isExpensive")
      neverCalledSkip: Boolean! @requires(fields: "isExpensive")
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
          };
        }

        return {
          id: product.id,
        };
      },
      include(product: { isExpensive?: number }) {
        if (typeof product.isExpensive !== "boolean") {
          throw new Error("isExpensive is missing");
        }

        return true;
      },
      neverCalledInclude() {
        throw new Error("neverCalledInclude should not be called");
      },
      skip(product: { isExpensive?: number }) {
        if (typeof product.isExpensive !== "boolean") {
          throw new Error("isExpensive is missing");
        }

        return true;
      },
      neverCalledSkip() {
        throw new Error("neverCalledSkip should not be called");
      },
    },
  },
});
