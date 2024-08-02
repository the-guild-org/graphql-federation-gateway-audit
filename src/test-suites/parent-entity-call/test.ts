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
    }
  ),
];
