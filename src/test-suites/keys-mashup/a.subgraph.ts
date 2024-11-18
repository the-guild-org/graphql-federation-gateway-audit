import { createSubgraph } from "../../subgraph.js";
import { data } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.5", import: ["@key"])

    type A
      @key(fields: "id", resolvable: true)
      @key(fields: "pId", resolvable: false)
      @key(fields: "compositeId { one two }", resolvable: false)
      @key(fields: "id compositeId { two three }", resolvable: false) {
      id: ID!
      pId: ID!
      compositeId: CompositeID!
      name: String!
    }

    type CompositeID {
      one: ID!
      two: ID!
      three: ID!
    }
  `,
  resolvers: {
    A: {
      __resolveReference: (reference: { id: string }) => {
        // The only key that is resolvable is "id"
        const obj = data.a[reference.id];

        if (!obj) {
          return null;
        }

        return {
          __typename: "A",
          id: obj.id,
          pId: obj.pId,
          compositeId: obj.compositeId,
          name: obj.name,
        };
      },
    },
  },
});
