import { createSubgraph } from "../../subgraph";
import { categories, products, punishPoorPlans } from "./data";

export default createSubgraph("category", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@external", "@provides"]
      )

    type Query {
      products: [Product]
        @shareable
        @provides(fields: "categories { id name subCategories { id name } }")
    }

    type Product @key(fields: "id") {
      id: ID!
      categories: [Category] @external
    }

    type Category @key(fields: "id") {
      id: ID!
      name: String
      subCategories: [Category] @external
    }
  `,
  resolvers: {
    Query: {
      products() {
        return products.map((p) => ({
          id: p.id,
          categories: p.categories.map((catId) => {
            const cat = categories.find((c) => c.id === catId);

            if (!cat) {
              return null;
            }

            return {
              id: cat.id,
              name: cat.name,
              subCategories: cat.subCategories.map((subCatId) => {
                const subCat = categories.find((c) => c.id === subCatId);

                if (!subCat) {
                  return null;
                }

                return {
                  id: subCat.id,
                  name: subCat.name,
                };
              }),
            };
          }),
        }));
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        if (punishPoorPlans) {
          throw new Error("You should be using the categories subgraph!");
        }

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
        if (punishPoorPlans) {
          throw new Error("You should be using the categories subgraph!");
        }

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
