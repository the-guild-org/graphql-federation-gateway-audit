import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        product {
          samePriceProduct {
            ... on Product {
              samePriceProduct {
                __typename
              }
            }
          }
        }
      }
    `,
    {
      data: {
        product: {
          samePriceProduct: {
            samePriceProduct: {
              __typename: "Book",
            },
          },
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          __typename
          samePriceProduct {
            __typename
            ... on Book {
              id
            }
            samePriceProduct {
              __typename
              ... on Book {
                id
              }
            }
          }
          ... on Book {
            __typename
            id
            price
            samePriceProduct {
              id
              price
            }
          }
        }
      }
    `,
    {
      data: {
        product: {
          __typename: "Book",
          samePriceProduct: {
            __typename: "Book",
            id: "3",
            samePriceProduct: {
              __typename: "Book",
              id: "1",
            },
            price: 10.99,
          },
          id: "1",
          price: 10.99,
        },
      },
    }
  ),
];
