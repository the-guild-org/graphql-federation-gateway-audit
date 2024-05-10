import { createSubgraph } from "../../subgraph";

export default createSubgraph('c', {
    typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key"]
      )
      type Category @key(fields: "id") {
        id: ID
        name: String
      }
    `,
    resolvers: {
        Category: {
            __resolveReference(category: { id: string }) {
                return {
                    id: category.id,
                    name: `Category#${category.id}`,
                }
            },
        }
    }
});
