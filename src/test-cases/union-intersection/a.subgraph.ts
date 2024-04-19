import { createSubgraph } from "../subgraph";
import { media } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@shareable"]
      )

    union Media = Book

    type Book {
      title: String! @shareable
    }

    type Query {
      media: Media @shareable
    }
  `,
  resolvers: {
    Query: {
      media: () => media,
    },
  },
});
