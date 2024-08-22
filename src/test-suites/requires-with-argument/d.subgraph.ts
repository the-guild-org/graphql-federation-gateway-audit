import { createSubgraph } from "../../subgraph.js";
import { authors, comments, posts } from "./data.js";

export default createSubgraph("d", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@external", "@requires"]
      )

    type Post @key(fields: "id") {
      id: ID!
      author: Author @requires(fields: "comments(limit: 3) { authorId }")
      comments(limit: Int!): [Comment]
    }

    type Comment @key(fields: "id") {
      id: ID!
      date: String
      authorId: ID @external
    }

    type Author {
      id: ID!
      name: String
    }
  `,
  resolvers: {
    Post: {
      __resolveReference(key: {
        id: string;
        comments?: Array<{ authorId: string }>;
      }) {
        const post = posts.find((p) => p.id === key.id);

        if (!post) {
          return null;
        }

        if (key.comments) {
          if (key.comments.length !== 3) {
            throw new Error("Expected 3 comments");
          }

          return {
            id: post.id,
            authorId: key.comments?.[2].authorId,
          };
        }

        return {
          id: post.id,
        };
      },
      author(post: { authorId?: string }) {
        if (!post.authorId) {
          return null;
        }

        const author = authors.find((a) => a.id === post.authorId);

        if (!author) {
          return null;
        }

        return {
          id: author.id,
          name: author.name,
        };
      },
      comments(post: { id: string }, { limit }: { limit: number }) {
        const coms = comments
          .filter((comment) => comment.postId === post.id)
          .slice(0, limit)
          .map((c) => ({
            id: c.id,
          }));

        return coms;
      },
    },
    Comment: {
      __resolveReference(key: { id: string }) {
        const comment = comments.find((c) => c.id === key.id);

        if (!comment) {
          return null;
        }

        return {
          id: comment.id,
        };
      },
    },
  },
});
