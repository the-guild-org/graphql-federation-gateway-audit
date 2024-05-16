import { createTest } from "../../test";

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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          product {
            __typename
            samePriceProduct {
              __typename
              samePriceProduct {
                __typename
              }
            }
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
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            product {
              __typename
              ... on Book {
                __typename
                id
                samePriceProduct {
                  __typename
                  id
                  price
                  samePriceProduct {
                    __typename
                    id
                  }
                }
              }
            }
          }
        },
        Flatten(path: "product") {
          Fetch(service: "b") {
            {
              ... on Book {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                price
              }
            }
          },
        },
      },
    }
    `
  ),
];
