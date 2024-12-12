import { createSubgraph, waitFor } from "../../../subgraph.js";
import { product } from "./data.js";

export default createSubgraph("name", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Query {
      product: Product! @shareable
      products: [Product!]! @shareable
    }

    type Product {
      id: ID! @shareable
      name: Name!
    }

    type Name {
      id: ID!
      brand: String!
      model: String!
    }
  `,
  resolvers: {
    Query: {
      product() {
        return {
          id: product.id,
          name: product.name,
        };
      },
      products() {
        return [
          {
            id: product.id,
            name: product.name,
          },
        ];
      },
    },
    Product: {
      async name(p: typeof product) {
        await waitFor(1000);
        return p.name;
      },
    },
  },
});
