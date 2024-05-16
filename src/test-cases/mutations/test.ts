import { createTest } from "../../test";

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
      }
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
      }
    ),
    // Test correct order of execution
    createTest(
      /* GraphQL */ `
      mutation {
        five: add(num: 5, requestId: "${randomId}")
        seven: add(num: 2, requestId: "${randomId}")
        final: delete(requestId: "${randomId}")
      }
    `,
      {
        data: {
          five: 5,
          seven: 7,
          final: 7,
        },
      }
    ),
  ];
};
