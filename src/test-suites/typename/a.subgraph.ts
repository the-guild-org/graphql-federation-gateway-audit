import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Query {
      union: Product
      interface: Node
    }

    union Product = Oven | Toaster

    interface Node {
      id: ID!
    }

    type Oven implements Node {
      id: ID!
    }

    type Toaster implements Node {
      id: ID!
    }

    interface User @key(fields: "id") {
      id: ID!
    }

    type Admin implements User @key(fields: "id") {
      id: ID!
      isMain: Boolean!
    }
  `,
  resolvers: {
    Query: {
      union() {
        return { id: "1", __typename: "Oven" };
      },
      interface() {
        return { id: "2", __typename: "Toaster" };
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((user) => user.id === key.id);

        if (!user) {
          return null;
        }

        return {
          __typename: user.__typename,
          id: user.id,
        };
      },
    },
    Admin: {
      __resolveReference(key: { id: string }) {
        const user = users.find((user) => user.id === key.id);

        if (!user) {
          return null;
        }

        return {
          __typename: user.__typename,
          id: user.id,
          isMain: user.isMain,
        };
      },
    },
  },
});
