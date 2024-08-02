import { createTest } from "../../testkit";

export default [
  createTest(
    /* GraphQL */ `
      {
        productNode {
          ... on Product {
            id
            name
            __typename
            price
          }
        }
      }
    `,
    {
      data: {
        productNode: {
          id: "p-1",
          name: "Product 1",
          __typename: "Product",
          price: 10,
        },
      },
    }
  ),
]