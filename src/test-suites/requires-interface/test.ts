import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        a {
          city
        }
      }
    `,
    {
      data: {
        a: {
          city: "a1-city",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        b {
          city
        }
      }
    `,
    {
      data: {
        b: {
          city: "a2-city",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          country
        }
      }
    `,
    {
      data: {
        a: {
          country: null,
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          address {
            __typename
            id
          }
        }
      }
    `,
    {
      data: {
        a: {
          address: {
            __typename: "HomeAddress",
            id: "a1",
          },
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        b {
          address {
            __typename
            id
          }
        }
      }
    `,
    {
      data: {
        b: {
          address: {
            __typename: "WorkAddress",
            id: "a2",
          },
        },
      },
    },
  ),
];
