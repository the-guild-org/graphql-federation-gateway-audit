import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          category {
            id
            details {
              products
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            category: {
              id: "c1",
              details: {
                products: 2,
              },
            },
          },
          {
            id: "p2",
            category: {
              id: "c2",
              details: {
                products: 1,
              },
            },
          },
          {
            id: "p3",
            category: {
              id: "c1",
              details: {
                products: 2,
              },
            },
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            products {
              __typename
              id
              pid
              category {
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "c") {
            {
              ... on Product {
                __typename
                id
                pid
              }
            } =>
            {
              ... on Product {
                category {
                  details {
                    products
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
