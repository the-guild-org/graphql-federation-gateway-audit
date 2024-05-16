import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        productFromD(id: "1") {
          id
          name
          category {
            id
            name
            details
          }
        }
      }
    `,
    {
      data: {
        productFromD: {
          id: "1",
          name: "Product#1",
          category: {
            id: "3",
            name: "Category#3",
            details: "Details for Product#1",
          },
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "d") {
          {
            productFromD(id: 1) {
              __typename
              id
              name
            }
          }
        },
        Parallel {
          Flatten(path: "productFromD") {
            Fetch(service: "a") {
              {
                ... on Product {
                  __typename
                  id
                }
              } =>
              {
                ... on Product {
                  category {
                    details
                  }
                }
              }
            },
          },
          Sequence {
            Flatten(path: "productFromD") {
              Fetch(service: "b") {
                {
                  ... on Product {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Product {
                    category {
                      __typename
                      id
                    }
                  }
                }
              },
            },
            Flatten(path: "productFromD.category") {
              Fetch(service: "c") {
                {
                  ... on Category {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Category {
                    name
                  }
                }
              },
            },
          },
        },
      },
    }
    `
  ),
];
