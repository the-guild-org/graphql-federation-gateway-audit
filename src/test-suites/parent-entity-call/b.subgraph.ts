import { createSubgraph } from "../../subgraph.js";
import { categories, products } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Product @key(fields: "id pid") {
      id: ID!
      pid: ID!
      category: Category @shareable
    }

    type Category @key(fields: "id") {
      id: ID!
      name: String! @shareable
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string; pid: string }) {
        const product = products.find(
          (p) => p.id === key.id && p.pid === key.pid
        );

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          pid: product.pid,
          categoryId: product.categoryId,
        };
      },
      category(product: { categoryId: string }) {
        const category = categories.find((c) => c.id === product.categoryId);

        if (!category) {
          return null;
        }

        return {
          id: category.id,
          name: category.name,
        };
      },
    },
    Category: {
      __resolveReference(key: { id: string }) {
        const category = categories.find((c) => c.id === key.id);

        if (!category) {
          return null;
        }

        return {
          id: category.id,
          name: category.name,
        };
      },
    },
  },
});
