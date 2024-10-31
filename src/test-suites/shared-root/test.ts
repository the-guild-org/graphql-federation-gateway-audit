import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name {
            id
            brand
            model
          }
          category {
            id
            name
          }
          price {
            id
            amount
            currency
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          name: {
            id: "1",
            brand: "Brand 1",
            model: "Model 1",
          },
          price: {
            id: "1",
            amount: 1000,
            currency: "USD",
          },
          category: {
            id: "1",
            name: "Category 1",
          }
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          name {
            id
            brand
            model
          }
          category {
            id
            name
          }
          price {
            id
            amount
            currency
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "1",
            name: {
              id: "1",
              brand: "Brand 1",
              model: "Model 1",
            },
            price: {
              id: "1",
              amount: 1000,
              currency: "USD",
            },
            category: {
              id: "1",
              name: "Category 1",
            }
          },
        ],
      },
    },
  ),
];
