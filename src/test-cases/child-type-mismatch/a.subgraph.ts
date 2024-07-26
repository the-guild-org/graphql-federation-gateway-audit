import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@shareable"]
      )

    type User {
      id: ID @shareable
    }

    type Query {
      users: [User!]!
    }
  `,
  resolvers: {
    Query: {
      users() {
        return users.map((u) => ({ __typename: "User", id: u.id }));
      },
    },
  },
});
