import { createSubgraph } from "../../subgraph.js";
import { posts } from "./data.js";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@override", "@shareable"]
      )

    type Post @key(fields: "id") {
      id: ID!
      createdAt: String! @override(from: "non-existing") @shareable
    }

    type Query {
      feed: [Post] @shareable
      bFeed: [Post]
    }
  `,
  resolvers: {
    Query: {
      feed() {
        return posts;
      },
      bFeed() {
        return [posts[0]];
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
