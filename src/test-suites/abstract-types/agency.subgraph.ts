import { createSubgraph } from "../../subgraph.js";
import { agencies } from "./data.js";

export default createSubgraph("agency", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Agency @key(fields: "id") {
      id: ID!
      companyName: String
      email: Email
    }

    type Email {
      address: String
    }

    type Group @key(fields: "id") {
      id: ID!
      name: String
      email: String
    }

    extend union PublisherType = Agency | Group
  `,
  resolvers: {
    Agency: {
      __resolveReference(key: { id: string }) {
        return agencies.find((a) => a.id === key.id);
      },
    },
    Group: {
      __resolveReference(key: { id: string }) {
        return { id: key.id, name: "Group " + key.id, email: "group" + key.id + "@example.com" };
      },
    },
  },
});
