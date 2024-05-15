import { createTest } from "../../test";

export default [
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
];
