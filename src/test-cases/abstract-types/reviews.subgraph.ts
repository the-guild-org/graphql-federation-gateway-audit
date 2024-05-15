import { createSubgraph } from "../../subgraph";
import { products, reviews } from "./data";

const Product = {
  __resolveReference(key: { id: string; similar?: { id: string[] } }) {
    const product = products.find((product) => product.id === key.id);

    return product
      ? {
          __typename: product.__typename,
          id: product.id,
          similar: key.similar,
        }
      : null;
  },
  reviews(product: { id: string }) {
    return reviews
      .filter((review) => review.productId === product.id)
      .map((review) => {
        const product = products.find(
          (product) => product.id === review.productId
        );

        return {
          __typename: "Review",
          id: review.id,
          body: review.body,
          product: product
            ? {
                __typename: product.__typename,
                id: product.id,
              }
            : null,
        };
      });
  },
  reviewsCount(product: { id: string }) {
    return reviews.filter((review) => review.productId === product.id).length;
  },
  reviewsScore(product: { id: string }) {
    const productReviews = reviews.filter(
      (review) => review.productId === product.id
    );

    if (productReviews.length === 0) {
      return 0;
    }

    const sum = productReviews.reduce((acc, review) => acc + review.score, 0);
    return sum / productReviews.length;
  },
  reviewsOfSimilar(product: { __typename: string; similar: { id: string[] } }) {
    const similarProducts = products.filter(
      (p) =>
        p.__typename === product.__typename && product.similar.id.includes(p.id)
    );

    return similarProducts
      .flatMap((p) => reviews.filter((review) => review.productId === p.id))
      .map((review) => {
        const product = products.find(
          (product) => product.id === review.productId
        );

        return {
          __typename: "Review",
          id: review.id,
          body: review.body,
          product: product
            ? {
                __typename: product.__typename,
                id: product.id,
              }
            : null,
        };
      });
  },
};

export default createSubgraph("reviews", {
  typeDefs: /* GraphQL */ `
    schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@requires", "@external"]
      ) {
      query: Query
    }

    type Book implements Product & Similar @key(fields: "id") {
      id: ID!
      reviewsCount: Int!
      reviewsScore: Float! @shareable
      reviews: [Review!]!
      similar: [Book] @external
      reviewsOfSimilar: [Review!]! @requires(fields: "similar { id }")
    }

    type Magazine implements Product & Similar @key(fields: "id") {
      id: ID!
      reviewsCount: Int!
      reviewsScore: Float! @shareable
      reviews: [Review!]!
      similar: [Magazine] @external
      reviewsOfSimilar: [Review!]! @requires(fields: "similar { id }")
    }

    interface Product {
      id: ID!
      reviewsCount: Int!
      reviewsScore: Float!
      reviews: [Review!]!
    }

    interface Similar {
      similar: [Product]
    }

    type Query {
      review(id: Int!): Review
    }

    type Review {
      id: Int!
      body: String!
      product: Product
    }
  `,
  resolvers: {
    Query: {
      review(_: {}, { id }: { id: number }) {
        const review = reviews.find((review) => review.id === id);

        if (!review) {
          return null;
        }

        const product = products.find(
          (product) => product.id === review.productId
        );

        return {
          __typename: "Review",
          id: review.id,
          body: review.body,
          product: product
            ? {
                __typename: product.__typename,
                id: product.id,
              }
            : null,
        };
      },
    },
    Book: Product,
    Magazine: Product,
  },
});
