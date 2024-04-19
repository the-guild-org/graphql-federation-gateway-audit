import { createSubgraph } from "../../subgraph";
import { products } from "./data";

export default createSubgraph("price", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external"]
      )

    # Composition will fail if it's not an extension (I have no idea why this is the case)
    extend type Product @key(fields: "id") {
      id: ID! @external
      price: Float
    }

    type Query {
      cheapestProduct: Product
    }
  `,
  resolvers: {
    Product: {
      __resolveReference(key: { id: string }) {
        const product = products.find((product) => product.id === key.id);

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          price: product.price,
        };
      },
    },
    Query: {
      cheapestProduct() {
        let cheapest: (typeof products)[number] | null = null;

        for (const product of products) {
          if (cheapest) {
            if (product.price < cheapest.price) {
              cheapest = product;
            }
          } else {
            cheapest = product;
          }
        }

        return cheapest;
      },
    },
  },
});
