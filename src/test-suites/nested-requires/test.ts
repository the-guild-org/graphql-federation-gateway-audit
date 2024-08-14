import { createTest } from "../../testkit";

export default [
  createTest(
    /* GraphQL */ `
      query {
        user {
          aggregatedOrdersByStatus
          totalOrdersPrices
        }
      }
    `,
    {
      data: {
        user: {
          aggregatedOrdersByStatus: 1,
          totalOrdersPrices: 0,
        },
      },
    }
  ),
];