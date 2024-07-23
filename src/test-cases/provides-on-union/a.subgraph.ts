import { shouldPunishForPoorPlans } from "../../env";
import { createSubgraph } from "../../subgraph";
import { medias } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@external"]
      )

    type Query {
      media: [Media] @shareable
    }

    union Media = Book | Movie

    type Book @key(fields: "id") {
      id: ID!
    }

    type Movie @key(fields: "id") {
      id: ID!
    }
  `,
  resolvers: {
    Query: {
      media(_p: unknown, _a: unknown, context: any) {
        if (shouldPunishForPoorPlans(context)) {
          throw new Error("You should not be using the 'a' subgraph!");
        }

        return medias.map((media) => ({
          __typename: media.__typename,
          id: media.id,
        }));
      },
    },
  },
});
