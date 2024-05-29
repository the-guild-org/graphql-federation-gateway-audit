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
      book: Media @shareable
      viewer: Viewer @shareable
    }

    union Media = Book | Movie
    union ViewerMedia = Book | Movie

    type Movie {
      title: String! @shareable
    }

    type Book {
      title: String! @shareable
    }

    type Viewer {
      media: ViewerMedia @shareable
      book: ViewerMedia @shareable
    }
  `,
  resolvers: {
    Query: {
      media: () => media,
      book: () => media,
      viewer: () => {
        return {
          media,
          book: media,
        };
      },
    },
  },
});
