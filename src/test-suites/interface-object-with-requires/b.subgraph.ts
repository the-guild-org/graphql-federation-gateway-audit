import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@interfaceObject", "@external", "@requires"]
      )

    type Query {
      anotherUsers: [NodeWithName]
    }

    type NodeWithName @key(fields: "id") @interfaceObject {
      id: ID!
      name: String @external
      username: String @requires(fields: "name")
    }
  `,
  resolvers: {
    NodeWithName: {
      __resolveReference(key: { id: string } | { id: string; name: string }) {
        const node = users.find((u) => u.id === key.id);

        if (!node) {
          return null;
        }

        return {
          __typename: "User",
          id: node.id,
          name: "name" in key ? key.name : undefined,
        };
      },
      username(node: { id: string; name: string }) {
        const user = users.find((u) => u.id === node.id);

        if (!user) {
          return null;
        }

        if (!node.name) {
          throw new Error("Requires field 'name' not provided");
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
