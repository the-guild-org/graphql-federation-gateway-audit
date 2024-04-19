import { createSubgraph } from "../subgraph";
import { imagePosts, textPosts } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@shareable", "@override"]
      )

    interface Post {
      id: ID!
      createdAt: String!
    }

    type TextPost implements Post @key(fields: "id") {
      id: ID!
      createdAt: String!
      body: String!
    }

    interface AnotherPost {
      id: ID!
      createdAt: String!
    }

    type ImagePost implements AnotherPost @key(fields: "id") {
      id: ID!
      createdAt: String! @override(from: "a")
    }

    type Query {
      anotherFeed: [AnotherPost]
    }
  `,
  resolvers: {
    Query: {
      anotherFeed() {
        return imagePosts;
      },
    },
    TextPost: {
      __resolveReference(key: { id: string }) {
        const post = textPosts.find((p) => p.id === key.id);

        if (!post) {
          return null;
        }

        return {
          id: post.id,
          createdAt: post.createdAt,
          body: post.body,
        };
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
    },
  },
});
