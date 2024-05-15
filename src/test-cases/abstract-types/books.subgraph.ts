import { createSubgraph } from "../../subgraph";
import { books } from "./data";

export default createSubgraph("books", {
  typeDefs: /* GraphQL */ `
    schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@external", "@requires"]
      ) {
      query: Query
    }

    type Book @key(fields: "id") {
      id: ID!
      title: String
    }

    type Query {
      books: [Book]
    }
  `,
  resolvers: {
    Query: {
      books() {
        return books.map((book) => ({
          __typename: "Book",
          id: book.id,
          title: book.title,
        }));
      },
    },
    Book: {
      __resolveReference(key: { id: string }) {
        const book = books.find((book) => book.id === key.id);

        return book
          ? {
              __typename: "Book",
              id: book.id,
              title: book.title,
            }
          : null;
      },
    },
  },
});
