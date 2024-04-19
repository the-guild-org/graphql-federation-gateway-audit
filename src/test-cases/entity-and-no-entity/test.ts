import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        users {
          id
          name
        }
        accounts {
          ... on User {
            id
            name
          }
          ... on Admin {
            id
            photo
          }
        }
      }
    `,
    {
      data: {
        users: [
          {
            id: "n1",
            name: "n1-profile",
          },
        ],
        accounts: [
          {
            id: "n1",
            name: "n1-profile",
          },
          {
            id: "a1",
            photo: "a1-photo",
          },
        ],
      },
    }
  ),
];
