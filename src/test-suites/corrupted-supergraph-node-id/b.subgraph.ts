import { createSubgraph } from "../../subgraph.js";
import { accounts, chats } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@external"]
      )
    type Query {
      node(id: ID!): Node @shareable
      chat(id: String!): Chat
    }

    interface Node {
      id: ID!
    }

    type Account implements Node @key(fields: "id") {
      id: ID! @external
      chats: [Chat!]!
    }

    type Chat implements Node @key(fields: "id") {
      id: ID!
      text: String!
    }
  `,
  resolvers: {
    Query: {
      node(_: {}, { id }: { id: string }) {
        const account = accounts.find((a) => a.id === id);

        if (account) {
          return {
            __typename: "Account",
            id: "never",
            chatIds: chats
              .filter((c) => c.accountId === account.id)
              .map((c) => c.id),
          };
        }

        const chat = chats.find((c) => c.id === id);

        if (chat) {
          return {
            __typename: "Chat",
            id: chat.id,
            text: chat.text,
          };
        }

        return null;
      },
      chat(_: {}, { id }: { id: string }) {
        const chat = chats.find((c) => c.id === id);

        if (chat) {
          return {
            __typename: "Chat",
            id: chat.id,
            text: chat.text,
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
            chatIds: chats
              .filter((c) => c.accountId === account.id)
              .map((c) => c.id),
          };
        }

        return null;
      },
      chats(account: { chatIds: string[] }) {
        return chats
          .filter((c) => account.chatIds.includes(c.id))
          .map((chat) => ({
            __typename: "Chat",
            id: chat.id,
            text: chat.text,
          }));
      },
    },
    Chat: {
      __resolveReference(key: { id: string }) {
        const chat = chats.find((c) => c.id === key.id);

        if (chat) {
          return {
            __typename: "Chat",
            id: chat.id,
            text: chat.text,
          };
        }

        return null;
      },
    },
  },
});
