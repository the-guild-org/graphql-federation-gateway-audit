import { createSubgraph } from "../../subgraph";
import { users, accounts } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@interfaceObject", "@shareable"]
      )

    type Query {
      anotherUsers: [NodeWithName]
      accounts: [Account] @shareable
    }

    type Account @key(fields: "id") @interfaceObject {
      id: ID!
      name: String!
    }

    type NodeWithName @key(fields: "id") @interfaceObject {
      id: ID!
      username: String
    }
  `,
  resolvers: {
    NodeWithName: {
      __resolveReference(key: { id: string }) {
        const node = users.find((u) => u.id === key.id);

        if (!node) {
          return null;
        }

        return {
          __typename: "User",
          id: node.id,
          username: node.username,
        };
      },
      username(node: { id: string }) {
        const user = users.find((u) => u.id === node.id);

        if (!user) {
          return null;
        }

        return user.username;
      },
    },
    Account: {
      __resolveReference(key: { __typename: string; id: string }) {
        const account = accounts.find((account) => account.id === key.id);

        if (!account) {
          return null;
        }

        return {
          // I deliberately return a wrong __typename here to make sure it's not used by the gateway
          __typename: "Never",
          id: account.id,
        };
      },
      name(account: { id: string }) {
        return accounts.find((u) => u.id === account.id)?.name;
      },
    },
    Query: {
      anotherUsers() {
        return users.map((u) => ({
          __typename: "User",
          id: u.id,
          username: u.username,
        }));
      },
      accounts() {
        return accounts.map((user) => {
          return {
            // I deliberately return a wrong __typename here to make sure it's not used by the gateway
            __typename: "Never",
            id: user.id,
          };
        });
      },
    },
  },
});
