import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("c", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@requires", "@external"]
      )

    type User @key(fields: "id") {
      id: ID!
      name: String! @external
      cName: String! @requires(fields: "name")
    }

    type Query {
      userInC: User
    }
  `,
  resolvers: {
    Query: {
      userInC() {
        return users[2];
      },
    },
    User: {
      __resolveReference(key: { id: string } | { id: string; name: string }) {
        const user = users.find((u) => u.id === key.id);

        if (!user) {
          return null;
        }

        if ("name" in key) {
          return {
            id: user.id,
            name: user.name,
          };
        }

        return {
          id: user.id,
        };
      },
      name() {
        return "NEVER";
      },
      cName(user: { name: string }) {
        return `c__${user.name}`;
      },
    },
  },
});
