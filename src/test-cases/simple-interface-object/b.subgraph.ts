import { createSubgraph } from "../../subgraph";
import { users } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@interfaceObject"]
      )

    type Query {
      anotherUsers: [NodeWithName]
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
    Query: {
      anotherUsers() {
        return users.map((u) => ({
          __typename: "User",
          id: u.id,
          username: u.username,
        }));
      },
    },
  },
});
