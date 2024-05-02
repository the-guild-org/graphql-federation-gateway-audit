import { createSubgraph } from "../../subgraph";
import { type Node, nodes } from "./data";

export default createSubgraph("user", {
    typeDefs: /* GraphQL */ `
        interface Node {
            id: ID!
        }

        type User implements Node @key(fields: "id") {
            id: ID!
            name: String!
        }
  `,
    resolvers: {
        User: {
            __resolveReference: (key: Node) => nodes.find((node) => node.id === key.id && node.__typename === 'User'),
        }
    },
});
