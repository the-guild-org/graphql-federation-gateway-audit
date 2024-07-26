import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        usersInA(filter: { first: 1 }) {
          id
        }
      }
    `,
    {
      data: {
        usersInA: [
          {
            id: "u1",
          },
          {
            id: "u2",
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersInA(filter: { first: 1, offset: 2 }) {
          id
        }
      }
    `,
    {
      errors: true,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersInB(filter: { first: 1, offset: 2 }) {
          id
        }
      }
    `,
    {
      errors: true,
    }
  ),
];
