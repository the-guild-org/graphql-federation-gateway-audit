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
  createTest(
    /* GraphQL */ `
      query {
        product {
          canAffordWithDiscount
        }
      }
    `,
    {
      data: {
        product: {
          canAffordWithDiscount: true,
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          canAfford
          canAffordWithDiscount
        }
      }
    `,
    {
      data: {
        product: {
          canAfford: false,
          canAffordWithDiscount: true,
        },
      },
    },
  ),
];
