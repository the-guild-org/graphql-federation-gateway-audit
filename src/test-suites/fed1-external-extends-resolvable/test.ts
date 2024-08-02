import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        productInA {
          id
          pid
          price
          upc
          name
        }
      }
    `,
    {
      data: {
        productInA: {
          id: "p1",
          pid: "p1-pid",
          price: 12.3,
          upc: "upc1",
          name: "p1-name",
        },
      },
    },
  ),
];
