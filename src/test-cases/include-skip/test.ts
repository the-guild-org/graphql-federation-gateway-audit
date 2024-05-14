import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = false) {
        product {
          price
          neverCalledInclude @include(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = true) {
        product {
          price
          neverCalledSkip @skip(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = true) {
        product {
          price
          include @include(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
          include: true,
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = false) {
        product {
          price
          skip @skip(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
          skip: true,
        },
      },
    }
  ),
];
