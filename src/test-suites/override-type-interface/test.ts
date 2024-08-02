import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        feed {
          id
          createdAt
        }
      }
    `,
    {
      data: {
        feed: [
          {
            id: "i1",
            createdAt: "i1-createdAt",
          },
          {
            id: "i2",
            createdAt: "i2-createdAt",
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        feed {
          ... on TextPost {
            id
            body
          }
        }
      }
    `,
    {
      data: {
        feed: [{}, {}],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        anotherFeed {
          createdAt
        }
      }
    `,
    {
      data: {
        anotherFeed: [
          {
            createdAt: "i1-createdAt",
          },
          {
            createdAt: "i2-createdAt",
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      {
        anotherFeed {
          createdAt
          id
          ... on ImagePost {
            createdAt
            id
          }
        }
      }
    `,
    {
      data: {
        anotherFeed: [
          {
            createdAt: "i1-createdAt",
            id: "i1",
          },
          {
            createdAt: "i2-createdAt",
            id: "i2",
          },
        ],
      },
    }
  ),
];
