import { createSubgraph } from "../../subgraph";
import { addresses, users } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      b: User
    }

    interface Address {
      id: ID!
    }

    type HomeAddress implements Address @key(fields: "id") {
      id: ID!
      city: String @shareable
    }

    type WorkAddress implements Address @key(fields: "id") {
      id: ID!
      city: String @shareable
    }

    type User @key(fields: "id") {
      id: ID!
      name: String! @shareable
      address: Address @shareable
    }
  `,
  resolvers: {
    Query: {
      b() {
        const user = users[1];

        return {
          id: user.id,
          name: user.name,
          address: user.address,
        };
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((user) => user.id === key.id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          address: user.address,
        };
      },
      address(user: { id: string; address: string }) {
        return addresses.find((address) => address.id === user.address);
      },
    },
    HomeAddress: {
      __resolveReference(key: { id: string }) {
        return addresses.find((address) => address.id === key.id);
      },
    },
    WorkAddress: {
      __resolveReference(key: { id: string }) {
        return addresses.find((address) => address.id === key.id);
      },
    },
  },
});
