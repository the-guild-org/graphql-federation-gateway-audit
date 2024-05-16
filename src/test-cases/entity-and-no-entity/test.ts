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
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Sequence {
          Fetch(service: "a") {
            {
              users {
                __typename
                id
              }
            }
          },
          Flatten(path: "users.@") {
            Fetch(service: "b") {
              {
                ... on User {
                  __typename
                  id
                }
              } =>
              {
                ... on User {
                  name
                }
              }
            },
          },
        },
        Fetch(service: "b") {
          {
            accounts {
              __typename
              ... on User {
                id
                name
              }
              ... on Admin {
                id__alias_0: id
                photo
              }
            }
          }
        },
      },
    }
    `
  ),
];
