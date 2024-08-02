import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("age", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@inaccessible", "@shareable"]
      )

    type Query {
      usersInAge: [User!]! @shareable
    }

    type User @key(fields: "id") {
      id: ID
      age: Int
    }
  `,
  resolvers: {
    Query: {
      usersInAge() {
        return users.map((u) => ({
          id: u.id,
          age: u.age,
        }));
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
          age: user.age,
        };
      },
    },
  },
});
