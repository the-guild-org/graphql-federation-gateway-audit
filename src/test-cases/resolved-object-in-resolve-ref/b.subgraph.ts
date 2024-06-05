import { createSubgraph } from "../../subgraph";
import { data } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key", "@requires", "@external"]
      )

    type Query {
      b: TypeB
    }

    type TypeB @key(fields: "id") {
      id: ID!
      favouriteTypeAs: [TypeA!]!
    }

    type TypeA
      @key(fields: "compositeId { one two }", resolvable: false)
      @key(fields: "id compositeId { two three }", resolvable: true)
      @key(fields: "pId", resolvable: false)
      @key(fields: "id", resolvable: false) {
      id: ID!
      pId: ID!
      compositeId: TypeACompositeID!
      name: String! @external
      nameInTypeB: String! @requires(fields: "name")
    }

    type TypeACompositeID {
      one: ID!
      two: ID!
      three: ID!
    }
  `,
  resolvers: {
    Query: {
      b: () => {
        return data.b["100"];
      },
    },
    TypeB: {
      favouriteTypeAs: ({ favouriteAs }: { favouriteAs: string[] }) => {
        return favouriteAs.map((id) => ({
          id,
          pId: `p:${id}`,
          compositeId: {
            one: `from TypeB - compositeId - 1: ${id}`,
            two: `from TypeB - compositeId - 2: ${id}`,
            three: `from TypeB - compositeId - 3: ${id}`,
          },
        }));
      },
    },
    TypeA: {
      __resolveReference: (reference: unknown) => {
        return reference;
      },
      nameInTypeB: ({ name }: { name: string }) => {
        return `b.TypeA.nameInTypeB ${name}`;
      },
    },
  },
});
