import { createSchema } from "graphql-yoga";
import { createSubgraph } from "../../subgraph";
import { type Node, nodes } from "./data";
import { execute } from "graphql";

const resolvers = {
    Query: {
        node: (_: never, { id }: Node) => nodes.find((node) => node.id === id),
    },
}

const schemaForExecution = createSchema({
    typeDefs: /* GraphQL */ `
        interface Node {
            id: ID!
        }
        type User implements Node {
            id: ID!
        }
        type Post implements Node {
            id: ID!
        }
        type Query {
            node(id: ID!): Node
        }
    `,
    resolvers,
})

export default createSubgraph("node", {
    typeDefs: /* GraphQL */ `
        interface Node {
            id: ID!
        }

        type Query {
            node(id: ID!): Node
        }
  `,
    resolvers,
}, {
    execute(args) {
        return execute({
            ...args,
            schema: schemaForExecution,
        })
    }
});
