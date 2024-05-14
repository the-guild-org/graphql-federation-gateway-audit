import { createSubgraph } from "../../subgraph";
import { medias, punishNonPerformantPlans } from "./data";

export default createSubgraph("c", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Book @key(fields: "id") {
      id: ID!
      title: String @shareable
    }

    type Movie @key(fields: "id") {
      id: ID!
      title: String @shareable
    }
  `,
  resolvers: {
    Book: {
      __resolveReference(key: { id: string }) {
        if (punishNonPerformantPlans) {
          throw new Error("You should be using the 'b' subgraph!");
        }

        const media = medias.find((media) => media.id === key.id);

        if (!media) {
          return null;
        }

        return {
          __typename: media.__typename,
          id: media.id,
          title: media.title,
        };
      },
    },
    Movie: {
      __resolveReference(key: { id: string }) {
        const media = medias.find((media) => media.id === key.id);

        if (!media) {
          return null;
        }

        return {
          __typename: media.__typename,
          id: media.id,
          title: media.title,
        };
      },
    },
  },
});
