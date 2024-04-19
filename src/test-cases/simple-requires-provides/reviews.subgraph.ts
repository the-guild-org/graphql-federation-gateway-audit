import { createSubgraph } from "../subgraph";
import { products, reviews, users } from "./data";

export default createSubgraph("reviews", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@provides"]
      )

    type Review @key(fields: "id") {
      id: ID!
      body: String
      author: User @provides(fields: "username")
      product: Product
    }

    type User @key(fields: "id") {
      id: ID!
      username: String @external
      reviews: [Review]
    }

    type Product @key(fields: "upc") {
      upc: String!
      reviews: [Review]
    }
  `,
  resolvers: {
    Review: {
      __resolveReference(key: { id: string }) {
        const review = reviews.find((r) => r.id === key.id);

        if (!review) {
          return null;
        }

        return {
          id: review.id,
          body: review.body,
          authorId: review.authorId,
          productUpc: review.productUpc,
        };
      },
      author(review: { id: string; authorId: string }) {
        const user = users.find((u) => u.id === review.authorId);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
        };
      },
      product(review: { productUpc: string }) {
        const product = products.find((p) => p.upc === review.productUpc);

        if (!product) {
          return null;
        }

        return {
          upc: product.upc,
          reviews: reviews
            .filter((r) => r.productUpc === product.upc)
            .map((r) => ({
              id: r.id,
              body: r.body,
              authorId: r.authorId,
              productUpc: r.productUpc,
            })),
        };
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((u) => u.id === key.id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
        };
      },
      reviews(user: { id: string }) {
        return reviews.filter((r) => r.authorId === user.id);
      },
    },
    Product: {
      __resolveReference(key: { upc: string }) {
        return {
          upc: key.upc,
        };
      },
      reviews(product: { upc: string }) {
        return reviews.filter((r) => r.productUpc === product.upc);
      },
    },
  },
});
