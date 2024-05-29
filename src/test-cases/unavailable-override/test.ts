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
      Fetch(service: "a") {
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
        Fetch(service: "a") {
          {
            aFeed {
              createdAt
            }
          }
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
