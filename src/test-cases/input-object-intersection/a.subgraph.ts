import { createSubgraph } from "../../subgraph";
import { users } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    input UsersFilter {
      first: Int!
    }

    type User @key(fields: "id") {
      id: ID!
      name: String! @shareable
    }

    type Query {
      usersInA(filter: UsersFilter!): [User!]
    }
  `,
  resolvers: {
    Query: {
      usersInA(_: {}, { filter }: { filter: { first: number } }) {
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
