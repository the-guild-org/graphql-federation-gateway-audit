import { createSubgraph } from "../../subgraph";
import { posts } from "./data";

export default createSubgraph("a", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable"]
      )

    type Post @key(fields: "id") {
      id: ID!
      createdAt: String! @shareable
    }

    type Query {
      feed: [Post] @shareable
      aFeed: [Post]
    }
  `,
  resolvers: {
    Query: {
      feed() {
        return posts;
      },
      aFeed() {
        return [posts[1]];
      },
    },
    Post: {
      __resolveReference(key: { id: string }) {
        const post = posts.find((p) => p.id === key.id);

        if (!post) {
          return null;
        }

        return {
          id: post.id,
          createdAt: post.createdAt,
        };
      },
    },
  },
});
