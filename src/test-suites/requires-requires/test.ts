import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        product {
          canAfford
        }
      }
    `,
    {
      data: {
        product: {
          canAfford: false,
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          isExpensive
        }
      }
    `,
    {
      data: {
        product: {
          isExpensive: true,
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          isExpensive
          canAfford
        }
      }
    `,
    {
      data: {
        product: {
          isExpensive: true,
          canAfford: false,
        },
      },
    },
  ),
];
