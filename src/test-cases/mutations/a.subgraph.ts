import { Env } from "../../env";
import { createSubgraph } from "../../subgraph";
import { addProduct, deleteProduct, getProducts, initProducts } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Mutation {
      addProduct(input: AddProductInput!): Product!
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
      async product(_: {}, { id }: { id: string }, ctx: { env: Env }) {
        await initProducts(ctx.env);
        const product = (await getProducts(ctx.env)).find((p) => p.id === id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      },
      async products(_: {}, __: {}, ctx: { env: Env }) {
        await initProducts(ctx.env);
        return getProducts(ctx.env);
      },
    },
    Mutation: {
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
        ctx: { env: Env }
      ) {
        return addProduct(ctx.env, input.name, input.price);
      },
    },
    Product: {
      async __resolveReference(key: { id: string }, ctx: { env: Env }) {
        const products = await getProducts(ctx.env);
        const product = products.find((p) => p.id === key.id);

        if (!product) {
          return null;
        }

        await deleteProduct(ctx.env, product.id);

        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      },
    },
  },
});
