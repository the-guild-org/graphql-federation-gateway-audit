import { createTest } from "../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        cheapestProduct {
          id
          price
          name
        }
      }
    `,
    {
      data: {
        cheapestProduct: {
          id: "1",
          price: 100,
          name: "name-1",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          name
          price
          id
        }
      }
    `,
    {
      data: {
        products: [
          {
            name: "name-1",
            price: 100,
            id: "1",
          },
          {
            name: "name-2",
            price: 200,
            id: "2",
          },
        ],
      },
    }
  ),
];
