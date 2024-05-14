import { createSubgraph } from "../../subgraph";
import { deleteProductAt, getProducts, addProduct } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Mutation {
      addProduct(input: AddProductInput!): Product!
    }

    type Query {
      product: Product!
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
      product() {
        const product = getProducts()[0];
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      },
    },
    Mutation: {
      addProduct(
        _: {},
        {
          input,
        }: {
          input: {
            name: string;
            price: number;
          };
        }
      ) {
        return addProduct(input.name, input.price);
      },
    },
    Product: {
      __resolveReference(key: { id: string }) {
        const products = getProducts();
        const productIndex = products.findIndex((p) => p.id === key.id);
        const product = products[productIndex];

        if (!product) {
          return null;
        }

        if (product.id.startsWith("p-added-")) {
          // delete the product from the list (it's no longer needed)
          deleteProductAt(productIndex);
        }

        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      },
    },
  },
});
