import { createSubgraph } from "../../subgraph.js";
import { categories, products } from "./data.js";

export default createSubgraph("products", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@external", "@extends", "@shareable"]
      )

    type Query {
      topProducts: ProductList!
    }

    type ProductList @key(fields: "products{id}") {
      products: [Product!]!
    }

    type Product @extends @key(fields: "id") {
      id: String! @external
      category: Category @shareable
    }

    type Category @key(fields: "id") {
      mainProduct: Product! @shareable
      id: String!
      tag: String @shareable
    }
  `,
  resolvers: {
    Query: {
      topProducts() {
        return {
          products,
        };
      },
    },
    ProductList: {
      __resolveReference(key: { products: { id: string }[] }) {
        return {
          products: products.filter((p) =>
            key.products.some((k) => k.id === p.id)
          ),
        };
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        return products.find((product) => product.id === key.id);
      },
      category(product: (typeof products)[number]) {
        return categories.find((c) => c.id === product.categoryId);
      },
    },
    Category: {
      __resolveReference(key: { id: string }) {
        return categories.find((c) => c.id === key.id);
      },
      mainProduct(category: (typeof categories)[number]) {
        return products.find((p) => p.id === category.mainProduct);
      },
    },
  },
});
