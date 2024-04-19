import { createSubgraph } from "../../subgraph";
import { media } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@shareable"]
      )

    type Query {
      media: Media @shareable
    }

    union Media = Book | Movie

    type Movie {
      title: String! @shareable
    }

    type Book {
      title: String! @shareable
    }
  `,
  resolvers: {
    Query: {
      media: () => media,
    },
  },
});
