import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name
          category
          price
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          name: "Product 1",
          price: 100,
          category: "Category 1",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Fetch(service: "name") {
          {
            product {
              name
            }
          }
        },
        Fetch(service: "category") {
          {
            product {
              category
              id
            }
          }
        },
        Fetch(service: "price") {
          {
            product {
              price
            }
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          name
          category
          price
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "1",
            name: "Product 1",
            price: 100,
            category: "Category 1",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Fetch(service: "name") {
          {
            products {
              name
            }
          }
        },
        Fetch(service: "category") {
          {
            products {
              category
              id
            }
          }
        },
        Fetch(service: "price") {
          {
            products {
              price
            }
          }
        },
      },
    }
    `
  ),
];
