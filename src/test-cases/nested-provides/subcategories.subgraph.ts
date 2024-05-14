import { createSubgraph } from "../../subgraph";
import { categories, products, punishNonPerformantPlans } from "./data";

export default createSubgraph("subcategories", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      products: [Product] @shareable
    }

    type Product @key(fields: "id") {
      id: ID!
      categories: [Category] @shareable
    }

    type Category @key(fields: "id") {
      id: ID!
      name: String @shareable
      subCategories: [Category] @shareable
    }
  `,
  resolvers: {
    Query: {
      products() {
        if (punishNonPerformantPlans) {
          throw new Error("You should be using the categories subgraph!");
        }

        return products.map((p) => ({
          id: p.id,
          categories: p.categories,
        }));
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        if (punishNonPerformantPlans) {
          throw new Error("You should be using the categories subgraph!");
        }

        const product = products.find((p) => p.id === key.id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          categories: product.categories,
        };
      },
      categories(product: { categories: string[] }) {
        if (punishNonPerformantPlans) {
          throw new Error("You should be using the categories subgraph!");
        }

        return product.categories.map((catId) => {
          const cat = categories.find((c) => c.id === catId);

          if (!cat) {
            return null;
          }

          return {
            id: cat.id,
            name: cat.name,
            subCategories: cat.subCategories,
          };
        });
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
          name: cat.name,
          subCategories: cat.subCategories,
        };
      },
      subCategories(category: { subCategories: string[] }) {
        return category.subCategories.map((catId) => {
          const cat = categories.find((c) => c.id === catId);

          if (!cat) {
            return null;
          }

          return {
            id: cat.id,
            name: cat.name,
            subCategories: cat.subCategories,
          };
        });
      },
    },
  },
});
