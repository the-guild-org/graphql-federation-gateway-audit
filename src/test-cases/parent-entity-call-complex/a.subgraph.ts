import { createSubgraph } from "../../subgraph";

export default createSubgraph('a', {
    typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@shareable"]
      )
      
      type Product @key(fields: "id") {
        id: ID @external
        category: Category @shareable
      }
      type Category {
        details: String
      }
    `,
    resolvers: {
        Product: {
            __resolveReference(product: { id: string }) {
                return {
                    id: product.id, 
                    category: { details: `Details for Product#${product.id}` },
                }
            },
        }
    }
});
