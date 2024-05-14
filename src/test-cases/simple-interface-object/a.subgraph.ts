import { createSubgraph } from "../../subgraph";
import { users, accounts } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      users: [NodeWithName!]!
    }

    interface NodeWithName @key(fields: "id") {
      id: ID!
      name: String
    }

    type User implements NodeWithName @key(fields: "id") {
      id: ID!
      name: String
      age: Int
    }

    interface Account @key(fields: "id") {
      id: ID!
    }

    type Admin implements Account @key(fields: "id") {
      id: ID!
      isMain: Boolean!
      isActive: Boolean! @shareable
    }

    type Regular implements Account @key(fields: "id") {
      id: ID!
      isMain: Boolean!
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
          name: node.name,
          age: node.age,
        };
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((u) => u.id === key.id);

        if (!user) {
          return null;
        }

        return {
          __typename: "User",
          id: user.id,
          name: user.name,
          age: user.age,
        };
      },
    },
    Account: {
      __resolveReference(key: { id: string }) {
        const account = accounts.find((account) => account.id === key.id);

        if (!account) {
          return null;
        }

        return {
          __typename: account.__typename,
          id: account.id,
          isActive: account.isActive,
        };
      },
    },
    Admin: {
      __resolveReference(key: { id: string }) {
        const admin = accounts.find((account) => account.id === key.id);

        if (!admin) {
          return null;
        }

        return {
          __typename: admin.__typename,
          id: admin.id,
          isMain: admin.isMain,
          isActive: admin.isActive,
        };
      },
      isMain(admin: { id: string; isMain?: boolean }) {
        if (typeof admin.isMain === "boolean") {
          return admin.isMain;
        }

        const account = accounts.find((a) => a.id === admin.id);

        if (!account) {
          return null;
        }

        return account.isMain;
      },
    },
    Regular: {
      __resolveReference(key: { id: string }) {
        const admin = accounts.find((account) => account.id === key.id);

        if (!admin) {
          return null;
        }

        return {
          __typename: admin.__typename,
          id: admin.id,
          isMain: admin.isMain,
          isActive: admin.isActive,
        };
      },
      isMain(admin: { id: string; isMain?: boolean }) {
        if (typeof admin.isMain === "boolean") {
          return admin.isMain;
        }

        const account = accounts.find((a) => a.id === admin.id);

        if (!account) {
          return null;
        }

        return account.isMain;
      },
    },
    Query: {
      users() {
        return users.map((u) => ({
          __typename: "User",
          id: u.id,
          name: u.name,
          age: u.age,
        }));
      },
    },
  },
});
