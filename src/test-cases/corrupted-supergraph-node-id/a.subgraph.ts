import { createSubgraph } from "../../subgraph";
import { accounts, chats } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@external"]
      )

    type Query {
      node(id: ID!): Node @shareable
      account(id: String!): Account
    }

    interface Node {
      id: ID!
    }

    type Account implements Node @key(fields: "id") {
      id: ID!
      username: String!
    }

    type Chat implements Node @key(fields: "id") {
      id: ID! @external
      account: Account!
    }
  `,
  resolvers: {
    Query: {
      node(_: {}, { id }: { id: string }) {
        const account = accounts.find((a) => a.id === id);

        if (account) {
          return {
            __typename: "Account",
            id: account.id,
            username: account.username,
          };
        }

        const chat = chats.find((c) => c.id === id);

        if (chat) {
          return {
            __typename: "Chat",
            id: "never",
            accountId: chat.accountId,
          };
        }
      },
      account(_: {}, { id }: { id: string }) {
        const account = accounts.find((a) => a.id === id);

        if (account) {
          return {
            __typename: "Account",
            id: account.id,
            username: account.username,
          };
        }

        return null;
      },
    },
    Account: {
      __resolveReference(key: { id: string }) {
        const account = accounts.find((a) => a.id === key.id);

        if (account) {
          return {
            __typename: "Account",
            id: account.id,
            username: account.username,
          };
        }

        return null;
      },
    },
    Chat: {
      __resolveReference(key: { id: string }) {
        const chat = chats.find((c) => c.id === key.id);

        if (chat) {
          return {
            __typename: "Chat",
            id: chat.id,
            accountId: chat.accountId,
          };
        }

        return null;
      },
      account(chat: { accountId: string }) {
        const account = accounts.find((a) => a.id === chat.accountId);

        if (account) {
          return {
            __typename: "Account",
            id: account.id,
            username: account.username,
          };
        }

        return null;
      },
    },
  },
});
