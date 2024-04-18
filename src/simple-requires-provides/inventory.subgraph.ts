import { createSubgraph } from "../subgraph";
import { inStock, products } from "./data";

export default createSubgraph("inventory", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@requires"]
      )

    type Product @key(fields: "upc") {
      upc: String!
      weight: Int @external
      price: Int @external
      inStock: Boolean
      shippingEstimate: Int @requires(fields: "price weight")
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(
        key: { upc: string; price: number; weight: number } | { upc: string }
      ) {
        const product = products.find((p) => p.upc === key.upc);

        if (!product) {
          return null;
        }

        if ("weight" in key && "price" in key) {
          return {
            upc: product.upc,
            weight: key.weight,
            price: key.price,
          };
        }

        return {
          upc: product.upc,
        };
      },
      shippingEstimate(product: { price: number; weight: number }) {
        return product.price * product.weight * 10;
      },
      inStock(product: { upc: string }) {
        return inStock.includes(product.upc);
      },
    },
  },
});
