import { createSubgraph } from "../../subgraph.js";
import { categories, products } from "./data.js";

export default createSubgraph("price", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable"]
      )

    type ProductList
      @key(fields: "products{id pid category{id tag}} selected{id}") {
      products: [Product!]!
      first: Product @shareable
      selected: Product @shareable
    }

    type Product @key(fields: "id pid category{id tag}") {
      id: String!
      price: Price
      pid: String
      category: Category
    }

    type Category @key(fields: "id tag") {
      id: String!
      tag: String
    }

    type Price {
      price: Float!
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: {
        id: string;
        pid: string;
        category: { id: string; tag: string };
      }) {
        return products.find((p) => {
          if (p.id === key.id && p.pid === key.pid) {
            const cat = categories.find((c) => c.id === p.categoryId);

            if (
              cat &&
              cat.id === key.category.id &&
              cat.tag === key.category.tag
            ) {
              return true;
            }
          }

          return false;
        });
      },
      price(product: (typeof products)[number]) {
        return {
          price: product.price,
        };
      },
      category(product: (typeof products)[number]) {
        return categories.find((c) => c.id === product.categoryId);
      },
    },
    Category: {
      __resolveReference(key: { id: string; tag: string }) {
        return categories.find((c) => c.id === key.id);
      },
    },
    ProductList: {
      __resolveReference(key: {
        products: {
          id: string;
          pid: string;
          category: { id: string; tag: string };
        }[];
        selected: { id: string };
      }) {
        const prods = products.filter((p) =>
          key.products.some((k) => {
            if (p.id === k.id && p.pid === k.pid) {
              const cat = categories.find((c) => c.id === p.categoryId);

              if (
                cat &&
                cat.id === k.category.id &&
                cat.tag === k.category.tag
              ) {
                return true;
              }
            }

            return false;
          })
        );

        return {
          products: prods,
          first: prods[0],
          selected: products.find((p) => p.id === key.selected.id),
        };
      },
    },
  },
});
