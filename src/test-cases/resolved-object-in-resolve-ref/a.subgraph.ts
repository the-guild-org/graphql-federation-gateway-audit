import { createSubgraph } from "../../subgraph";
import { data } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.5", import: ["@key"])

    type TypeA
      @key(fields: "id", resolvable: true)
      @key(fields: "pId", resolvable: false)
      @key(fields: "compositeId { one two }", resolvable: false)
      @key(fields: "id compositeId { two three }", resolvable: false) {
      id: ID!
      pId: ID!
      compositeId: TypeACompositeID!
      name: String!
    }

    type TypeACompositeID {
      one: ID!
      two: ID!
      three: ID!
    }
  `,
  resolvers: {
    TypeA: {
      __resolveReference: (reference: { id: string }) => {
        return data.a[reference.id];
      },
      name: ({ name }: { id: string; name: string }) => {
        return name;
      },
    },
  },
});
