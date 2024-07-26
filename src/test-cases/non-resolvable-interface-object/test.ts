import { createTest } from "../../testkit.js";

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
          # NOTE
          # Even though Node in subgraph B is an interface object,
          # there is no type condition in the query,
          # so "id" and "field" fields can be resolved directly.
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
      data: null,
      errors: true,
    },
    /* GraphQL */ `
    # NOTE
    # Query.a is only available in subgraph A.
    # Query.a resolves Node interface, but none of the object types in subgraph A implement Node.
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
          # NOTE
          # Even though Node in subgraph B is an interface object,
          # there is no type condition in the query,
          # so "id" field can be resolved directly.
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
          # NOTE
          # Query.a is only available in subgraph A.
          # Query.a resolves Node interface,
          # but none of the object types in subgraph A implement Node.
          # Asking for "id" field is not possible.
          # It's interesting that the query planner doesn't make an empty query to subgraph A.
          # It clearly knows that the query is impossible to resolve.
          # I would imagine that the request would be { a { __typename } },
          # just like in the previous test case where we fetched { a { field } }.
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
