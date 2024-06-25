import { createSubgraph } from "../../subgraph";
import { users } from "./data";

function accounts() {
  return [
    ...users.map((user) => ({ __typename: "User", ...user })),
    { __typename: "Admin", id: "a1", name: "a1-name" },
  ];
}

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
      similarAccounts: [Account!]!
    }

    type Admin {
      id: ID
      name: String @shareable
      similarAccounts: [Account!]!
    }

    type Query {
      accounts: [Account!]!
    }
  `,
  resolvers: {
    Query: {
      accounts,
    },
    User: {
      __resolveReference(key: { id: string }) {
        return users.find((user) => user.id === key.id);
      },
      similarAccounts: accounts,
    },
    Admin: {
      similarAccounts: accounts,
    },
  },
});
