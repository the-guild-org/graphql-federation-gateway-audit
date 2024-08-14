import { createSubgraph } from "../../subgraph.js";

export default createSubgraph("service1", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.5", import: ["@key"])

    type User @key(fields: "id") {
      id: ID!
      firstName: String!
      lastName: String!
      address: String
    }

    type Query {
      user: User
    }
  `,
  resolvers: {
    Query: {
      user: () => {
        return {
          id: 1,
          firstName: "Jake",
          lastName: "Dawkins",
          address: "everywhere",
        };
      },
    },
  },
});
