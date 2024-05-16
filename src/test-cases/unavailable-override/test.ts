import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        feed {
          createdAt
        }
      }
    `,
    {
      data: {
        feed: [
          {
            createdAt: "p1-createdAt",
          },
          {
            createdAt: "p2-createdAt",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          feed {
            createdAt
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        aFeed {
          createdAt
        }
        bFeed {
          createdAt
        }
      }
    `,
    {
      data: {
        aFeed: [
          {
            createdAt: "p2-createdAt",
          },
        ],
        bFeed: [
          {
            createdAt: "p1-createdAt",
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
              aFeed {
                __typename
                id
              }
            }
          },
          Flatten(path: "aFeed.@") {
            Fetch(service: "b") {
              {
                ... on Post {
                  __typename
                  id
                }
              } =>
              {
                ... on Post {
                  createdAt
                }
              }
            },
          },
        },
        Fetch(service: "b") {
          {
            bFeed {
              createdAt
            }
          }
        },
      },
    }
    `
  ),
];
