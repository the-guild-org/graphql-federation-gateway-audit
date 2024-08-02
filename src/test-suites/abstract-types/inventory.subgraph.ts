import { createSubgraph } from "../../subgraph.js";
import { books, magazines } from "./data.js";

export default createSubgraph("inventory", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@external", "@requires"]
      )

    interface Product {
      id: ID!
      dimensions: ProductDimension
      delivery(zip: String): DeliveryEstimates
    }

    type Book implements Product @key(fields: "id") {
      id: ID!
      dimensions: ProductDimension @external
      delivery(zip: String): DeliveryEstimates
        @requires(fields: "dimensions { size weight }")
    }

    type Magazine implements Product @key(fields: "id") {
      id: ID!
      dimensions: ProductDimension @external
      delivery(zip: String): DeliveryEstimates
        @requires(fields: "dimensions { size weight }")
    }

    type ProductDimension @shareable {
      size: String
      weight: Float
    }

    type DeliveryEstimates {
      estimatedDelivery: String
      fastestDelivery: String
    }
  `,
  resolvers: {
    Book: {
      __resolveReference(key: {
        id: string;
        dimensions?: {
          size: string;
          weight: number;
        };
      }) {
        const book = books.find((book) => book.id === key.id);

        if (!book) {
          return null;
        }

        return {
          __typename: book.__typename,
          id: book.id,
          dimensions: key.dimensions,
        };
      },
      delivery(
        { dimensions }: { dimensions?: { size: string; weight: number } },
        { zip }: { zip?: string }
      ) {
        if (!zip) {
          return null;
        }

        if (!dimensions) {
          return null;
        }

        if (dimensions.size === "small" && dimensions.weight < 1) {
          return {
            estimatedDelivery: "1 day",
            fastestDelivery: "same day",
          };
        }

        if (dimensions.size === "large" && dimensions.weight >= 1) {
          return {
            estimatedDelivery: "3 days",
            fastestDelivery: "2 days",
          };
        }

        return null;
      },
    },
    Magazine: {
      __resolveReference(key: {
        id: string;
        dimensions?: {
          size: string;
          weight: number;
        };
      }) {
        const magazine = magazines.find((magazine) => magazine.id === key.id);

        if (!magazine) {
          return null;
        }

        return {
          __typename: magazine.__typename,
          id: magazine.id,
          dimensions: key.dimensions,
        };
      },
      delivery(
        { dimensions }: { dimensions?: { size: string; weight: number } },
        { zip }: { zip?: string }
      ) {
        if (!zip) {
          return null;
        }

        if (!dimensions) {
          return null;
        }

        if (dimensions.size === "small" && dimensions.weight < 1) {
          return {
            estimatedDelivery: "1 day",
            fastestDelivery: "same day",
          };
        }

        if (dimensions.size === "large" && dimensions.weight >= 1) {
          return {
            estimatedDelivery: "3 days",
            fastestDelivery: "2 days",
          };
        }

        return null;
      },
    },
  },
});
