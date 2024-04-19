import { createSubgraph } from "../../subgraph";

import { users } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@shareable", "@key"]
      )

    union Account = User | Admin

    type User @key(fields: "id") {
      id: ID!
      name: String
    }

    type Admin {
      id: ID
      photo: String @shareable
    }

    type Query {
      accounts: [Account!]!
    }
  `,
  resolvers: {
    Query: {
      accounts() {
        return [
          ...users.map((user) => ({ __typename: "User", ...user })),
          { __typename: "Admin", id: "a1", photo: "a1-photo" },
        ];
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        return users.find((user) => user.id === key.id);
      },
    },
  },
});
