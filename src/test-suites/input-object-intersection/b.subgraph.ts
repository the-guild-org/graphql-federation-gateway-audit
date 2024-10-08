import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    input UsersFilter {
      offset: Int
      first: Int!
    }

    type User @key(fields: "id") {
      id: ID!
      name: String! @shareable
    }

    type Query {
      usersInB(filter: UsersFilter!): [User!]
    }
  `,
  resolvers: {
    Query: {
      usersInB(
        _: {},
        { filter }: { filter: { offset?: number; first: number } },
      ) {
        if ("offset" in filter) {
          return [];
        }

        return users;
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((user) => user.id === key.id);

        if (!user) {
          return null;
        }

        return user;
      },
    },
  },
});
