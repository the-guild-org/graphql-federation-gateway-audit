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
    }
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
    }
  ),
];
