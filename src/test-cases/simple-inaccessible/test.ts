import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        usersInAge {
          id
          friends {
            id
          }
        }
      }
    `,
    {
      data: {
        usersInAge: [
          {
            id: "u1",
            friends: [
              {
                id: "u2",
              },
            ],
          },
          {
            id: "u2",
            friends: [
              {
                id: "u1",
              },
            ],
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "age") {
          {
            usersInAge {
              __typename
              id
            }
          }
        },
        Flatten(path: "usersInAge.@") {
          Fetch(service: "friends") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                friends {
                  id
                }
              }
            }
          },
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersInFriends {
          id
          friends {
            id
          }
        }
      }
    `,
    {
      data: {
        usersInFriends: [
          {
            id: "u1",
            friends: [
              {
                id: "u2",
              },
            ],
          },
          {
            id: "u2",
            friends: [
              {
                id: "u1",
              },
            ],
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "friends") {
        {
          usersInFriends {
            id
            friends {
              id
            }
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersInFriends {
          id
          friends(type: FRIEND) {
            id
          }
        }
      }
    `,
    {
      errors: true,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersInFriends {
          id
          friends {
            id
            type
          }
        }
      }
    `,
    {
      data: {
        usersInFriends: [
          {
            id: "u1",
            friends: [
              {
                id: "u2",
                type: null,
              },
            ],
          },
          {
            id: "u2",
            friends: [
              {
                id: "u1",
                type: null,
              },
            ],
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "friends") {
        {
          usersInFriends {
            id
            friends {
              id
              type
            }
          }
        }
      },
    }
    `
  ),
];
