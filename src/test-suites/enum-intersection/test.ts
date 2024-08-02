import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        users {
          id
        }
      }
    `,
    {
      data: {
        users: [
          {
            id: "u1",
          },
          {
            id: "u2",
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        users {
          id
          type
        }
      }
    `,
    {
      errors: true,
      data: {
        users: [
          {
            id: "u1",
            type: "REGULAR",
          },
          {
            id: "u2",
            type: null,
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersB {
          id
          type
        }
      }
    `,
    {
      data: {
        usersB: [
          {
            id: "u1",
            type: "REGULAR",
          },
          {
            id: "u2",
            type: null,
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersByType(type: REGULAR) {
          id
          type
        }
      }
    `,
    {
      data: {
        usersByType: [
          {
            id: "u1",
            type: "REGULAR",
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        usersByType(type: ANONYMOUS) {
          id
          type
        }
      }
    `,
    {
      errors: true,
      data: null,
    },
  ),
];
