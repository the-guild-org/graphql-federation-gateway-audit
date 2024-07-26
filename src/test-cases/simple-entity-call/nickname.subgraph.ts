import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("nickname", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@external"]
      )

    type User @key(fields: "email") {
      email: String! @external
      nickname: String!
    }
  `,
  resolvers: {
    User: {
      __resolveReference(key: { email: string }) {
        const user = users.find((u) => u.email === key.email);

        if (!user) {
          return null;
        }

        return {
          nickname: user.nickname,
        };
      },
    },
  },
});
