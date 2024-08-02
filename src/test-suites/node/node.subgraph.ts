import { createSubgraph } from "../../subgraph.js";
import { categories, products } from "./data.js";

export default createSubgraph("node", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Query {
      productNode: Node
      categoryNode: Node
    }

    interface Node {
      id: ID!
    }

    type Product implements Node @key(fields: "id") {
      id: ID!
    }

    type Category implements Node @key(fields: "id") {
      id: ID!
    }
  `,
  resolvers: {
    Query: {
      productNode() {
        return {
          __typename: "Product",
          id: products[0].id,
        };
      },
      categoryNode() {
        return {
          __typename: "Category",
          id: categories[0].id,
        };
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        const product = products.find((p) => p.id === key.id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
        };
      },
    },
    Category: {
      __resolveReference(key: { id: string }) {
        const cat = categories.find((c) => c.id === key.id);

        if (!cat) {
          return null;
        }

        return {
          id: cat.id,
        };
      },
    },
  },
});
