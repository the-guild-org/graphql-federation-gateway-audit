import { createSubgraph } from "../../subgraph";
import { users } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external"]
      )

    type Query {
      randomUser: User
    }

    extend type User @key(fields: "id") {
      id: ID! @external
      rid: ID
    }
  `,
  resolvers: {
    Query: {
      randomUser() {
        return {
          id: users[0].id,
          rid: users[0].rid,
        };
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((u) => u.id === key.id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          rid: user.rid,
        };
      },
      name() {
        return "never";
      },
    },
  },
});
