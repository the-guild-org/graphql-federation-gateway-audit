import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    type Query {
      randomUser: User
      providedRandomUser: User @provides(fields: "name")
    }

    extend type User @key(fields: "id") {
      id: ID! @external
      name: String! @external
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
      providedRandomUser() {
        return {
          id: users[0].id,
          rid: users[0].rid,
          name: users[0].name,
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
      name(user: { name: string | undefined }) {
        return user.name ?? "never";
      },
    },
  },
});
