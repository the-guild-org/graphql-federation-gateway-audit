import { createSubgraph } from "../../subgraph.js";
import { addresses, users } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@requires", "@external", "@shareable"]
      )

    type Query {
      a: User
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
      address: Address @external
      city: String @requires(fields: "address { id }")
      country: String @requires(fields: "address { ... on WorkAddress { id } }")
    }
  `,
  resolvers: {
    Query: {
      a() {
        const user = users[0];

        return {
          id: user.id,
          name: user.name,
        };
      },
    },
    User: {
      __resolveReference(key: { id: string; address?: { id?: string } }) {
        const user = users.find((user) => user.id === key.id);

        if (!user) {
          return null;
        }

        if (key.address?.id) {
          return {
            id: user.id,
            name: user.name,
            address: {
              id: user.address,
            },
          };
        }

        return {
          id: user.id,
          name: user.name,
        };
      },
      city(user: { address: { id: string } }) {
        return addresses.find((address) => address.id === user.address.id)
          ?.city;
      },
      country(user: { address?: { id?: string } }) {
        return addresses.find((address) => address.id === user?.address?.id)
          ?.country;
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
