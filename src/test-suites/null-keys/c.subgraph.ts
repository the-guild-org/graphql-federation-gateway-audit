import { createSubgraph } from "../../subgraph.js";
import { books } from "./data.js";

export default createSubgraph("c", {
    typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key"]
      )

    type Book @key(fields: "id") {
        id: ID!
        author: Author
    }

    type Author {
        id: ID!
        name: String
    }
  `,
    resolvers: {
        Book: {
            __resolveReference(reference: { id: String; } | { upc: String; }) {
                if (reference != null) {
                    let book: { id: string; author: { id: string; name: string; } } | undefined;
                    if ('id' in reference && reference.id !== null) {
                        book = books.find((book) => book.id === reference.id);
                    }
                    if ('upc' in reference && reference.upc !== null) {
                        book = books.find((book) => book.upc === reference.upc);
                    }
                    if (book != null) {
                        return {
                            __typename: "Book",
                            id: book.id,
                            author: {
                                __typename: "Author",
                                id: book.author.id,
                                name: book.author.name
                            }
                        };
                    }
                }
                throw new Error("Invalid reference");
            }
        }
    },
});
