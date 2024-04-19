import { createSubgraph } from "../../subgraph";
import { users } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@requires", "@external"]
      )

    type User @key(fields: "id") {
      id: ID!
      name: String! @external
      aName: String! @requires(fields: "name")
    }

    type Query {
      userInA: User
    }
  `,
  resolvers: {
    Query: {
      userInA() {
        return users[0];
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
      aName(user: { name: string }) {
        return `a__${user.name}`;
      },
      name() {
        return "NEVER";
      },
    },
  },
});
