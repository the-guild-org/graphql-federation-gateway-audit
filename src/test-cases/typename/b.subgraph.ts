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
      users: [User]
    }

    type User @key(fields: "id") @interfaceObject {
      id: ID!
      name: String!
    }
  `,
  resolvers: {
    Query: {
      users() {
        return users.map((user) => {
          return {
            // I deliberately return no __typename as it should not be resolved by the @interfaceObject
            id: user.id,
          };
        });
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((user) => user.id === key.id);

        if (!user) {
          return null;
        }

        return {
          // I deliberately return no __typename as it should not be resolved by the @interfaceObject
          id: user.id,
        };
      },
      name(user: { id: string }) {
        return users.find((u) => u.id === user.id)?.name;
      },
    },
  },
});
