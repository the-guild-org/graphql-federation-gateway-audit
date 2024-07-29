import { createTest } from "../../testkit.js";

export default () => {
  const randomId = Math.random().toString(16).substr(2);

  return [
    createTest(
      /* GraphQL */ `
        mutation {
          addProduct(input: { name: "new", price: 599.99 }) {
            name
            price
            isExpensive
            isAvailable
          }
        }
      `,
      {
        data: {
          addProduct: {
            name: "new",
            price: 599.99,
            isExpensive: true,
            isAvailable: true,
          },
        },
      },
      /* GraphQL */ `
      QueryPlan {
        Sequence {
          Fetch(service: "a") {
            {
              addProduct(input: {name: "new", price: 599.99}) {
                __typename
                id
                name
                price
              }
            }
          },
          Flatten(path: "addProduct") {
            Fetch(service: "b") {
              {
                ... on Product {
                  __typename
                  id
                  price
                }
              } =>
              {
                ... on Product {
                  isExpensive
                  isAvailable
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
          product(id: "p1") {
            id
            name
            price
            isExpensive
            isAvailable
          }
        }
      `,
      {
        data: {
          product: {
            id: "p1",
            name: "p1-name",
            price: 9.99,
            isExpensive: false,
            isAvailable: true,
          },
        },
      },
      /* GraphQL */ `
      QueryPlan {
        Sequence {
          Fetch(service: "a") {
            {
              product(id: "p1") {
                __typename
                id
                name
                price
              }
            }
          },
          Flatten(path: "product") {
            Fetch(service: "b") {
              {
                ... on Product {
                  __typename
                  id
                  price
                }
              } =>
              {
                ... on Product {
                  isExpensive
                  isAvailable
                }
              }
            },
          },
        },
      }
      `
    ),
    // Test correct order of execution
    // It obviously does not solve a problem with shared state and race conditions,
    // but at least it reduces the risk a bit
    createTest(
      /* GraphQL */ `
      mutation {
        five: add(num: 5, requestId: "${randomId}")
        ten: multiply(by: 2, requestId: "${randomId}")
        twelve: add(num: 2, requestId: "${randomId}")
        final: delete(requestId: "${randomId}")
      }
    `,
      {
        data: {
          five: 5,
          ten: 10,
          twelve: 12,
          final: 12,
        },
      },
      /* GraphQL */ `
      QueryPlan {
        Sequence {
          Fetch(service: "c") {
            {
              five: add(num: 5, requestId: "${randomId}")
            }
          },
          Fetch(service: "a") {
            {
              ten: multiply(by: 2, requestId: "${randomId}")
            }
          },
          Fetch(service: "c") {
            {
              twelve: add(num: 2, requestId: "${randomId}")
            }
          },
          Fetch(service: "b") {
            {
              final: delete(requestId: "${randomId}")
            }
          },
        },
      }
      `
    ),
  ];
};
