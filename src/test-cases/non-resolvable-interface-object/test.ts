import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        b {
          id
          field
        }
      }
    `,
    {
      data: {
        b: {
          id: "n1",
          field: "foo",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          field
        }
      }
    `,
    {
      data: {
        a: null,
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        b {
          id
        }
      }
    `,
    {
      data: {
        b: {
          id: "n1",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          id
        }
      }
    `,
    {
      data: {
        a: null,
      },
      errors: true,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
        }
      }
    `,
    {
      data: {
        product: {
          id: "p1",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name
        }
      }
    `,
    {
      errors: true,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        product {
          ... on Bread {
            id
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "p1",
        },
      },
    }
  ),
];
