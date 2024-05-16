import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        randomUser {
          id
          name
        }
        userById(id: "u2") {
          id
          name
          nickname
        }
      }
    `,
    {
      data: {
        randomUser: {
          id: "u1",
          name: "u1-name",
        },
        userById: {
          id: "u2",
          name: "u2-name",
          nickname: "u2-nickname",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Sequence {
          Fetch(service: "a") {
            {
              randomUser {
                __typename
                id
              }
            }
          },
          Flatten(path: "randomUser") {
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
            userById(id: "u2") {
              id
              name
              nickname
            }
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        randomUser {
          id
          rid
        }
      }
    `,
    {
      data: {
        randomUser: {
          id: "u1",
          rid: "u1-rid",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          randomUser {
            id
            rid
          }
        }
      },
    }
    `
  ),
];
