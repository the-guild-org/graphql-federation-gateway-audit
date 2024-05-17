import { createSubgraph } from "../../subgraph";
import { books } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Book @key(fields: "id") {
      id: ID!
      price: Float @shareable
    }
  `,

  resolvers: {
    Book: {
      __resolveReference(key: { id: string }) {
        const book = books.find((b) => b.id === key.id);

        if (!book) {
          return null;
        }

        return {
          __typename: book.__typename,
          id: book.id,
          price: book.price,
        };
      },
    },
  },
});
