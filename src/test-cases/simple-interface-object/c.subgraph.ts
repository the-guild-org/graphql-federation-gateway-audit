import { createSubgraph } from "../../subgraph";
import { accounts } from "./data";

export default createSubgraph("c", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@interfaceObject", "@shareable"]
      )

    type Account @key(fields: "id") @interfaceObject {
      id: ID!
      isActive: Boolean! @shareable
    }
  `,
  resolvers: {
    Account: {
      __resolveReference(key: { __typename: string; id: string }) {
        const account = accounts.find((account) => account.id === key.id);

        if (!account) {
          return null;
        }

        return {
          // I deliberately return a wrong __typename here to make sure it's not used by the gateway
          __typename: "Never",
          id: account.id,
        };
      },
      isActive(account: { id: string }) {
        return false;
      },
    },
    Query: {
      accounts() {
        return accounts.map((user) => {
          return {
            // I deliberately return a wrong __typename here to make sure it's not used by the gateway
            __typename: "Never",
            id: user.id,
          };
        });
      },
    },
  },
});
