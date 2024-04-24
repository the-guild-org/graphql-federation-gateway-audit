import { createSubgraph } from "../../subgraph";
import { users } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    type Query {
      randomUser: User
    }

    extend type User @key(fields: "id") {
      id: ID! @external
    }

    extend type User {
      name: String! @external
    }
  `,
  resolvers: {
    Query: {
      randomUser() {
        return {
          id: users[0].id,
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
        };
      },
      name() {
        return "never";
      },
    },
  },
});
