import { createSubgraph } from "../../subgraph.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable"]
      )

    interface Node {
      id: ID!
    }

    type Foobar implements Node {
      id: ID!

      uuid: String!
      version: Int!
      name: String!
      description: String
      category: [String!]
    }

    type Query {
      node(id: ID!): Node @shareable
    }
  `,
  resolvers: {
    Query: {
        node(_: never, { id }: { id: string }) {
            return {
                __typename: "Foobar",
                id,
                uuid: `uuid-${id}`,
            }
        }
    }
  },
});
