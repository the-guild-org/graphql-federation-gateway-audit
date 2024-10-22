import { createSubgraph } from "../../subgraph.js";
import { books } from "./data.js";

export default createSubgraph("a", {
    typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key"]
      )

    type Query {
        bookContainers: [BookContainer]
    }
    type BookContainer {
        book: Book
    }
    type Book @key(fields: "upc") {
        upc: ID!
    }
  `,
    resolvers: {
        Query: {
            bookContainers() {
                return books.map((book) => ({ book: { upc: book.upc } }));
            }
        }
    },
});
