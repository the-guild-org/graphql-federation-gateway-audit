import { createSubgraph } from "../../subgraph.js";

export default createSubgraph("service2", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key", "@requires", "@external"]
      )

    type UserOrder @key(fields: "id", resolvable: false) {
      id: ID!
    }

    type User @key(fields: "id") {
      id: ID!
      userOrders: [UserOrder!] @external
      totalOrdersPrices: Int @requires(fields: "userOrders { id }")
      aggregatedOrdersByStatus: Int @requires(fields: "userOrders { id }")
    }
  `,
  resolvers: {
    User: {
      totalOrdersPrices(user: any) {
        if (!Array.isArray(user.userOrders)) {
          return new Error("UserOrders is required to be an array");
        }
        return 0;
      },
      aggregatedOrdersByStatus(user: any) {
        if (!Array.isArray(user.userOrders)) {
          return new Error("UserOrders is required to be an array");
        }
        return 1;
      },
    },
  },
});
