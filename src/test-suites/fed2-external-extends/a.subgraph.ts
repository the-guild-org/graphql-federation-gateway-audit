import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@extends"]
      )

    type Query {
      randomUser: User
    }

    type User @key(fields: "id") @extends {
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
