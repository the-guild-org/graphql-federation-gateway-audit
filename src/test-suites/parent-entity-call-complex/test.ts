import { createTest } from "../../testkit.js";

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
  ),
];
