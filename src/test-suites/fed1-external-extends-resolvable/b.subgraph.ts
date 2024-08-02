import { createSubgraph } from "../../subgraph.js";
import { products } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    type Query {
      productInB: Product
    }

    extend type Product @key(fields: "id name") @key(fields: "upc") {
      id: ID @external
      name: String @external
      upc: String @external
      price: Float!
    }
  `,
  resolvers: {
    Query: {
      productInB: () => {
        return {
          id: products[0].id,
          name: products[0].name,
          upc: products[0].upc,
          price: products[0].price,
        };
      },
    },
    Product: {
      __resolveReference: (
        key:
          | { id: string; name: string }
          | {
              upc: string;
            },
      ) => {
        const product =
          "id" in key
            ? products.find((p) => p.id === key.id && p.name === key.name)
            : products.find((p) => p.upc === key.upc);

        return product
          ? {
              id: product.id,
              name: product.name,
              upc: product.upc,
              price: product.price,
            }
          : null;
      },
    },
  },
});
