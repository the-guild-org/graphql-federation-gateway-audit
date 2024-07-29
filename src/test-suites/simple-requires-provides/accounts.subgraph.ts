import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("accounts", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      me: User
    }

    type User @key(fields: "id") {
      id: ID!
      name: String
      username: String @shareable
    }
  `,
  resolvers: {
    Query: {
      me() {
        return {
          id: users[0].id,
          name: users[0].name,
          username: users[0].username,
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
          name: user.name,
          username: user.username,
        };
      },
    },
  },
});
