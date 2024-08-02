import { createSubgraph } from "../../subgraph.js";
import { users } from "./data.js";

export default createSubgraph("friends", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.3"
        import: ["@key", "@inaccessible", "@shareable"]
      )

    type Query {
      usersInFriends: [User!]!
    }

    type User @key(fields: "id") {
      id: ID
      friends(type: FriendType = FAMILY @inaccessible): [User!]!
      type: FriendType
    }

    enum FriendType {
      FAMILY @inaccessible
      FRIEND
    }
  `,
  resolvers: {
    Query: {
      usersInFriends() {
        return users.map((u) => ({
          id: u.id,
          friends: u.friends,
        }));
      },
    },
    User: {
      __resolveReference(key: { id: string }) {
        const user = users.find((u) => u.id === key.id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          friends: user.friends,
        };
      },
      friends(user: { id: string; friends: string[] }) {
        return user.friends.map((id) => {
          const friend = users.find((u) => u.id === id);

          if (!friend) {
            return null;
          }

          return {
            id: friend.id,
            friends: friend.friends,
          };
        });
      },
      type() {
        return "FAMILY";
      },
    },
  },
});
