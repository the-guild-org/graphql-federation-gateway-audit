import { Env } from "../../env";
import { createSubgraph } from "../../subgraph";
import { deleteNumber, deleteProduct, getProducts } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@requires"]
      )

    type Product @key(fields: "id") {
      id: ID!
      price: Float! @external
      isExpensive: Boolean! @requires(fields: "price")
      isAvailable: Boolean!
    }

    type Mutation {
      delete(requestId: String!): Int!
    }
  `,
  resolvers: {
    Mutation: {
      delete(
        _: {},
        args: {
          requestId: string;
        },
        ctx: { env: Env }
      ) {
        return deleteNumber(ctx.env, args.requestId);
      },
    },
    Product: {
      async __resolveReference(
        key: { id: string; price?: number },
        ctx: { env: Env }
      ) {
        const product = (await getProducts(ctx.env)).find(
          (product) => product.id === key.id
        );

        if (!product) {
          return null;
        }

        await deleteProduct(ctx.env, product.id);

        if (typeof product.price === "number") {
          return {
            id: product.id,
            isAvailable: true,
            price: product.price,
          };
        }

        return {
          id: product.id,
          isAvailable: false,
        };
      },
      isExpensive(product: { price?: number }) {
        if (typeof product.price !== "number") {
          throw new Error("Price is not available");
        }

        return product.price > 100;
      },
    },
  },
});
