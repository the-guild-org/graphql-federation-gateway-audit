import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("list", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable"]
      )

    type ProductList @key(fields: "products{id pid}") {
      products: [Product!]!
      first: Product @shareable
      selected: Product @shareable
    }

    type Product @key(fields: "id pid") {
      id: String!
      pid: String
    }
  `,
  resolvers: {
    ProductList: {
      __resolveReference(key: { products: { id: string; pid: string }[] }) {
        const prods = products.filter((p) =>
          key.products.some((k) => k.id === p.id && k.pid === p.pid)
        );
        return {
          products: prods,
          first: prods[0],
          selected: prods[1],
        };
      },
    },
    Product: {
      __resolveReference(key: { id: string; pid: string }) {
        return products.find(
          (product) => product.id === key.id && product.pid === key.pid
        );
      },
    },
  },
});
