import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Query {
      userById(id: ID): User
    }

    type User @key(fields: "id") {
      id: ID!
      name: String!
      nickname: String
    }
  `,
  resolvers: {
    Query: {
      userById: (_: {}, { id }: { id: string }) => {
        const user = users.find((u) => u.id === id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
        };
      },
    },
    User: {
      __resolveReference: (key: { id: string }) => {
        const user = users.find((u) => u.id === key.id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
        };
      },
    },
  },
});
