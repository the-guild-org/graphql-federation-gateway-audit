import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        media {
          id
          animals {
            id
            name
          }
        }
      }
    `,
    {
      data: {
        media: {
          id: "m1",
          animals: [
            {
              id: "a1",
              name: "Fido",
            },
            {
              id: "a2",
              name: "Whiskers",
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          media {
            __typename
            id
            animals {
              __typename
              id
              name
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
          id
          animals {
            id
            name
            ... on Cat {
              age
            }
          }
        }
      }
    `,
    {
      data: {
        media: {
          id: "m1",
          animals: [
            {
              id: "a1",
              name: "Fido",
            },
            {
              id: "a2",
              name: "Whiskers",
              age: 6,
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            media {
              __typename
              id
              animals {
                __typename
                id
                name
              }
              ... on Book {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "media") {
          Fetch(service: "c") {
            {
              ... on Book {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                animals {
                  __typename
                  ... on Cat {
                    age
                  }
                }
              }
            }
          },
        },
      },
    }
    `
  ),
];
