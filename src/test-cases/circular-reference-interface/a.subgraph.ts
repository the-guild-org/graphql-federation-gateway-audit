import { createSubgraph } from "../../subgraph";
import { books } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@provides"]
      )

    type Query {
      product: Product
    }

    interface Product {
      samePriceProduct: Product
    }

    type Book implements Product @key(fields: "id") {
      id: ID!
      samePriceProduct: Book @provides(fields: "price")
      price: Float @external
    }
  `,
  resolvers: {
    Query: {
      product() {
        const book = books[0];
        return {
          __typename: book.__typename,
          id: book.id,
          price: book.price,
        };
      },
    },
    Book: {
      samePriceProduct(book: { id: string; price: number }) {
        const samePriceBook = books.find(
          (b) => b.price === book.price && b.id !== book.id
        );

        if (!samePriceBook) {
          return null;
        }

        return {
          __typename: samePriceBook.__typename,
          id: samePriceBook.id,
          price: samePriceBook.price,
        };
      },
    },
  },
});
