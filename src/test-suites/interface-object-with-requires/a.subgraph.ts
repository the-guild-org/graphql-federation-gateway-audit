import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

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
