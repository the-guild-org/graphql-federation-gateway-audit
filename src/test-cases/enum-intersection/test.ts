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
    }
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
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          users {
            id
            # NOTE
            # type field resolves to null for ANONYMOUS users
            # because it is not a value available in the subgraph A
            type
          }
        }
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          usersB {
            id
            # NOTE
            # type field resolves to null for ANONYMOUS users
            # even though it is a value available in the subgraph B.
            # The response from the subgraph B contains:
            # {"type": "REGULAR"} and {"type": "ANONYMOUS"}.
            # It's the gateway that makes the "null" as it's @inaccessible enum value,
            # so it can't leak to the response.
            type
          }
        }
      },
    }
    `
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
    }
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
    /* GraphQL */ `
      # NOTE
      # It's Gateway that is responsible for validating the enum value.
      # It's @inaccessible so it should not be in the API schema (gateway schema).
    `
  ),
];
