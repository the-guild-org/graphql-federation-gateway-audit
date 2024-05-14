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
    }
  ),
];
