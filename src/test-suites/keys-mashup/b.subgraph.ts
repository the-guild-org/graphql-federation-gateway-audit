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
      b: B
    }

    type B @key(fields: "id") {
      id: ID!
      a: [A!]!
    }

    type A
      @key(fields: "compositeId { one two }", resolvable: false)
      @key(fields: "id compositeId { two three }", resolvable: true)
      @key(fields: "pId", resolvable: false)
      @key(fields: "id", resolvable: false) {
      id: ID!
      pId: ID!
      compositeId: CompositeID!
      name: String! @external
      nameInB: String! @requires(fields: "name")
    }

    type CompositeID {
      one: ID!
      two: ID!
      three: ID!
    }
  `,
  resolvers: {
    Query: {
      b: () => {
        return {
          __typename: "B",
          id: data.b["100"].id,
          a: data.b["100"].a,
        };
      },
    },
    B: {
      __resolveReference: (reference: { id: string }) => {
        const obj = data.b[reference.id];

        if (!obj) {
          return null;
        }

        return {
          __typename: "B",
          id: obj.id,
          a: obj.a,
        };
      },
      a: ({ a }: { a: string[] }) => {
        return a.map((id) => {
          const obj = data.a[id];

          if (!obj) {
            return null;
          }

          return {
            __typename: "A",
            id: obj.id,
            pId: obj.pId,
            compositeId: obj.compositeId,
          };
        });
      },
    },
    A: {
      __resolveReference: (reference: {
        id: string;
        compositeId: { two: string; three: string };
        name?: string;
      }) => {
        const obj = data.a[reference.id];

        if (!obj) {
          return null;
        }

        if (reference.name) {
          return {
            __typename: "A",
            id: obj.id,
            pId: obj.pId,
            compositeId: obj.compositeId,
            name: reference.name,
          };
        }

        return {
          __typename: "A",
          id: obj.id,
          pId: obj.pId,
          compositeId: obj.compositeId,
        };
      },
      nameInB: ({ name }: { name?: string }) => {
        if (!name) {
          throw new Error("A.name was not provided");
        }

        return `b.a.nameInB ${name}`;
      },
    },
  },
});
