import { createSubgraph } from "../../subgraph.js";
import { medias } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@provides", "@external"]
      )

    type Query {
      media: [Media] @shareable @provides(fields: "... on Book { title }")
    }

    union Media = Book | Movie

    type Book @key(fields: "id") {
      id: ID!
      title: String @external
    }

    type Movie @key(fields: "id") {
      id: ID!
    }
  `,
  resolvers: {
    Query: {
      media() {
        return medias.map((media) => {
          if (media.__typename === "Book") {
            return {
              __typename: media.__typename,
              id: media.id,
              title: media.title,
            };
          }

          return {
            __typename: media.__typename,
            id: media.id,
          };
        });
      },
    },
  },
});
