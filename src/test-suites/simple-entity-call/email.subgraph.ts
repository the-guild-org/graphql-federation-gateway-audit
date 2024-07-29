import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("email", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

    type Query {
      user: User
    }

    type User @key(fields: "id") {
      id: ID!
      email: String!
    }
  `,
  resolvers: {
    Query: {
      user() {
        return {
          id: users[0].id,
          email: users[0].email,
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
          email: user.email,
        };
      },
    },
  },
});
