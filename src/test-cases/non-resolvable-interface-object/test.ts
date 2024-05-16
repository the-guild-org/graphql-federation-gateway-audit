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
      data: {
        b: {
          id: "n1",
          field: "foo",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          b {
            id
            field
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          field
        }
      }
    `,
    {
      data: {
        a: null,
      },
    },
    /* GraphQL */ `
    QueryPlan {}
    `
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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          b {
            id
          }
        }
      },
    }
    `
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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          a {
            __typename
            id
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
        }
      }
    `,
    {
      data: {
        product: {
          id: "p1",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          product {
            id
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name
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
        product {
          ... on Bread {
            id
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "p1",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            product {
              __typename
              id
            }
          }
        },
        Flatten(path: "product") {
          Fetch(service: "b") {
            {
              ... on Product {
                __typename
                id
              }
            } =>
            {
              ... on Product {
                __typename
              }
            }
          },
        },
      },
    }
    `
  ),
];
