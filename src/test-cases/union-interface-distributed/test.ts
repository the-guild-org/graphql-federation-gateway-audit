import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        products {
          ... on Node {
            id
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "oven1",
          },
          {
            id: "oven2",
          },
          {
            id: "toaster1",
          },
          {
            id: "toaster2",
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        nodes {
          ... on Toaster {
            warranty
          }
          ... on Oven {
            id
          }
        }
      }
    `,
    {
      data: {
        nodes: [
          {
            warranty: 3,
          },
          {
            warranty: 4,
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        nodes {
          id
        }
      }
    `,
    {
      data: {
        nodes: [
          {
            id: "toaster1",
          },
          {
            id: "toaster2",
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      {
        toasters {
          ...ToasterFragment
          ...NodeFragment
        }
      }

      fragment ToasterFragment on Toaster {
        id
      }

      fragment NodeFragment on Node {
        id
        __typename
      }
    `,
    {
      data: {
        toasters: [
          {
            id: "toaster1",
            __typename: "Toaster",
          },
          {
            id: "toaster2",
            __typename: "Toaster",
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        node(id: "oven1") {
          ... on Oven {
            warranty
          }
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
        node(id: "oven1") {
          ... on Toaster {
            warranty
          }
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
        node(id: "toaster1") {
          ... on Toaster {
            warranty
          }
        }
      }
    `,
    {
      data: {
        node: {
          warranty: 3,
        },
      },
    }
  ),
];
