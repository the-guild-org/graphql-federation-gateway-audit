import { createSubgraph } from "../../subgraph.js";
import { imagePosts } from "./data.js";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    interface Post {
      id: ID!
      createdAt: String!
    }

    type ImagePost implements Post @key(fields: "id") {
      id: ID!
      createdAt: String!
    }

    type Query {
      feed: [Post]
    }
  `,
  resolvers: {
    Query: {
      feed() {
        return imagePosts;
      },
    },
    ImagePost: {
      __resolveReference(key: { id: string }) {
        const post = imagePosts.find((p) => p.id === key.id);

        if (!post) {
          return null;
        }

        return {
          id: post.id,
          createdAt: post.createdAt,
        };
      },
      createdAt() {
        return "NEVER";
      },
    },
  },
});
