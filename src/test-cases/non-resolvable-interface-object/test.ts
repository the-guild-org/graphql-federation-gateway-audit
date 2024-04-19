import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        b {
          id
          field
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
        b {
          id
        }
      }
    `,
    {
      data: {
        b: {
          id: "n1",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          id
        }
      }
    `,
    {
      data: {
        a: null,
      },
      errors: true,
    }
  ),
];
