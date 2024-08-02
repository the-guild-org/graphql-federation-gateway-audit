import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        media {
          ... on Book {
            id
            title
          }
          ... on Movie {
            id
          }
        }
      }
    `,
    {
      data: {
        media: [
          {
            id: "m1",
            title: "Book 1",
          },
          {
            id: "m2",
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        media {
          ... on Book {
            id
            title
          }
          ... on Movie {
            id
            title
          }
        }
      }
    `,
    {
      data: {
        media: [
          {
            id: "m1",
            title: "Book 1",
          },
          {
            id: "m2",
            title: "Movie 1",
          },
        ],
      },
    }
  ),
];
