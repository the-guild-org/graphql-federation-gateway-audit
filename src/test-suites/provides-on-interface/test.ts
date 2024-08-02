import { createTest } from "../../testkit.js";

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
    }
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
    }
  ),
];
