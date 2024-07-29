import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      users: [User]
    }

    type User @key(fields: "id") {
      id: ID
      type: UserType @shareable
    }

    enum UserType {
      REGULAR
    }
  `,
  resolvers: {
    Query: {
      users() {
        return users;
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
          type: user.type,
        };
      },
    },
  },
});
