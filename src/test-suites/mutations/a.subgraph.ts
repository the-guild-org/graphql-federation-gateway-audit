import { createSubgraph } from "../../subgraph.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  initProducts,
  multiplyNumber,
} from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Mutation {
      addProduct(input: AddProductInput!): Product!
      multiply(by: Int!, requestId: String!): Int!
    }

    type Query {
      product(id: ID!): Product!
      products: [Product!]!
    }

    input AddProductInput {
      name: String!
      price: Float!
    }

    type Product @key(fields: "id") {
      id: ID!
      name: String!
      price: Float!
    }
  `,
  resolvers: {
    Query: {
      async product(_: {}, { id }: { id: string }) {
        await initProducts();
        const product = (await getProducts()).find((p) => p.id === id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      },
      async products() {
        await initProducts();
        return getProducts();
      },
    },
    Mutation: {
      async multiply(
        _: {},
        args: {
          by: number;
          requestId: string;
        },
      ) {
        return multiplyNumber(args.by, args.requestId);
      },
      async addProduct(
        _: {},
        {
          input,
        }: {
          input: {
            name: string;
            price: number;
          };
        },
      ) {
        return addProduct(input.name, input.price);
      },
    },
    Product: {
      async __resolveReference(key: { id: string }) {
        const products = await getProducts();
        const product = products.find((p) => p.id === key.id);

        if (!product) {
          return null;
        }

        await deleteProduct(product.id);

        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      },
    },
  },
});
