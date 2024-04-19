import { createTest } from "../../test";

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
    }
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
    }
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
      errors: [
        {
          message: 'Unknown argument "type" on field "User.friends".',
        },
      ],
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
    }
  ),
];
