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
        },
        Book: {
            __resolveReference(reference: { upc: String; }) {
                if (reference != null) {
                    let book = books.find((book) => book.upc === reference.upc);
                    if (book != null && book.upc !== null) {
                        return {
                            __typename: "Book",
                            upc: book.upc
                        };
                    }
                }
                throw new Error("Invalid reference");
            },
        }
    },
});
