import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@override"]
      )

    type User @key(fields: "id") {
      id: ID!
      name: String! @override(from: "c")
    }

    type Query {
      userInB: User
    }
  `,
  resolvers: {
    Query: {
      userInB() {
        return users[1];
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
        };
      },
    },
  },
});
