import { createTest } from "../../test";

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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          media {
            __typename
            ... on Book {
              id
              title
            }
            ... on Movie {
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
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            media {
              __typename
              ... on Book {
                id
                title
              }
              ... on Movie {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "media.@") {
          Fetch(service: "c") {
            {
              ... on Movie {
                __typename
                id
              }
            } =>
            {
              ... on Movie {
                title
              }
            }
          },
        },
      },
    }
    `
  ),
];
