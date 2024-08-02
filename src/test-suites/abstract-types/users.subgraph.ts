import { createSubgraph } from "../../subgraph.js";
import { products, users } from "./data.js";

export default createSubgraph("users", {
  typeDefs: /* GraphQL */ `
    type User @key(fields: "email") {
      email: ID!
      name: String
      totalProductsCreated: Int
    }
  `,
  resolvers: {
    User: {
      __resolveReference(key: { email: string }) {
        const user = users.find((user) => user.email === key.email);

        return user
          ? {
              __typename: "User",
              id: user.id,
              email: user.email,
              name: user.name,
            }
          : null;
      },
      totalProductsCreated(user: { id: string }) {
        return products.filter((p) => p.createdBy === user.id).length;
      },
    },
  },
});
