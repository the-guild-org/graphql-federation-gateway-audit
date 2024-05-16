import { createTest } from "../../test";

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
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "price") {
          {
            cheapestProduct {
              __typename
              id
              price
            }
          }
        },
        Flatten(path: "cheapestProduct") {
          Fetch(service: "product") {
            {
              ... on Product {
                __typename
                id
              }
            } =>
            {
              ... on Product {
                name
              }
            }
          },
        },
      },
    }
    `
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
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "product") {
          {
            products {
              __typename
              id
              name
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "price") {
            {
              ... on Product {
                __typename
                id
              }
            } =>
            {
              ... on Product {
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
