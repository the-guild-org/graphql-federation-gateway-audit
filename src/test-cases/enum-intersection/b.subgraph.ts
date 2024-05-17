import { createSubgraph } from "../../subgraph";
import { users } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@inaccessible", "@shareable"]
      )

    type Query {
      usersByType(type: UserType!): [User!]
      usersB: [User!]
    }

    extend type User @key(fields: "id") {
      id: ID
      type: UserType @shareable
    }

    enum UserType {
      ANONYMOUS @inaccessible
      REGULAR
    }
  `,
  resolvers: {
    Query: {
      usersByType(_: {}, { type }: { type: string }) {
        return users.filter((u) => u.type === type);
      },
      usersB() {
        return users;
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
          type: user.type,
        };
      },
    },
  },
});
