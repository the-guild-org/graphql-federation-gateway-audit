import { createSubgraph } from "../../subgraph";
import { products, categories } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@shareable"]
      )

    type Query {
      products: [Product!]!
    }

    type Product @key(fields: "id") @key(fields: "id pid") {
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
    Query: {
      products() {
        return products.map((p) => ({
          id: p.id,
          pid: p.pid,
          categoryId: p.categoryId,
        }));
      },
    },
    Product: {
      __resolveReference(
        key:
          | {
              id: string;
            }
          | {
              id: string;
              pid: string;
            }
      ) {
        const product = products.find(
          (p) => p.id === key.id && ("pid" in key ? p.pid === key.pid : true)
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
