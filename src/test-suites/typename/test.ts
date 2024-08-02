import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        union {
          __typename
          typename: __typename
        }
      }
    `,
    {
      data: {
        union: {
          __typename: "Oven",
          typename: "Oven",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        interface {
          id
          __typename
          typename: __typename
          t: __typename
        }
      }
    `,
    {
      data: {
        interface: {
          id: "2",
          __typename: "Toaster",
          typename: "Toaster",
          t: "Toaster",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        union {
          __typename
          ... on Oven {
            typename: __typename
          }
          ... on Toaster {
            typename: __typename
          }
        }
      }
    `,
    {
      data: {
        union: {
          __typename: "Oven",
          typename: "Oven",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        interface {
          __typename
          ... on Oven {
            typename: __typename
          }
          ... on Toaster {
            typename: __typename
          }
        }
      }
    `,
    {
      data: {
        interface: {
          __typename: "Toaster",
          typename: "Toaster",
        },
      },
    },
  ),
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
          __typename
        }
      }
    `,
    {
      data: {
        users: [
          {
            __typename: "Admin",
          },
          {
            __typename: "Admin",
          },
        ],
      },
    },
  ),
];
