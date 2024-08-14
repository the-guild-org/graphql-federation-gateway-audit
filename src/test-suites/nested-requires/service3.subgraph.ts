import { createSubgraph } from "../../subgraph.js";

export default createSubgraph("service3", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key", "@requires", "@external"]
      )

    type UserOrder @key(fields: "id") {
      id: ID!
    }

    type User @key(fields: "id") {
      id: ID!
      lastName: String! @external
      userOrders: [UserOrder!] @requires(fields: "lastName")
    }
  `,
  resolvers: {
    User: {
      userOrders(user: any) {
        if (!user.lastName) {
          throw new Error("LastName is required");
        }
        return [
          {
            id: `${user.lastName}1`,
          },
        ];
      },
    },
  },
});
