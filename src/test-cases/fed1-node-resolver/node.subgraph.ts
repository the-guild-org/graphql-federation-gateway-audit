import { createSubgraph } from "../../subgraph";
import { type Node, nodes } from "./data";

export default createSubgraph("node", {
    typeDefs: /* GraphQL */ `
        interface Node {
            id: ID!
        }

        type Query {
            node(id: ID!): Node
        }
  `,
    resolvers: {
        Query: {
            node: (_: never, { id }: Node) => nodes.find((node) => node.id === id),
        },
    },
});
