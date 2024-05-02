import { createSubgraph } from "../../subgraph";
import { type Node, nodes } from "./data";

export default createSubgraph("post", {
    typeDefs: /* GraphQL */ `
        interface Node {
            id: ID!
        }

        type Post implements Node @key(fields: "id") {
            id: ID!
            title: String!
        }
  `,
    resolvers: {
        Post: {
            __resolveReference: (key: Node) => nodes.find((node) => node.id === key.id && node.__typename === 'Post'),
        }
    },
});
