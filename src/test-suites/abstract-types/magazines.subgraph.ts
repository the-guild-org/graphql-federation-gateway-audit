import { createSubgraph } from "../../subgraph.js";
import { magazines } from "./data.js";

export default createSubgraph("magazines", {
  typeDefs: /* GraphQL */ `
    schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      ) {
      query: Query
    }

    type Magazine @key(fields: "id") {
      id: ID!
      title: String
    }

    type Query {
      magazines: [Magazine]
    }
  `,
  resolvers: {
    Query: {
      magazines() {
        return magazines.map((magazine) => ({
          __typename: magazine.__typename,
          id: magazine.id,
          title: magazine.title,
        }));
      },
    },
    Magazine: {
      __resolveReference(key: { id: string }) {
        const magazine = magazines.find((magazine) => magazine.id === key.id);

        return magazine
          ? {
              __typename: magazine.__typename,
              id: magazine.id,
              title: magazine.title,
            }
          : null;
      },
    },
  },
});
