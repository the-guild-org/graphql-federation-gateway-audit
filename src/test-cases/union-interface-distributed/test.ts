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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          products {
            __typename
            ... on Oven {
              id
            }
            ... on Toaster {
              id
            }
          }
        }
      },
    }
    `
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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          nodes {
            __typename
            ... on Toaster {
              warranty
            }
          }
        }
      },
    }
    `
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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          nodes {
            __typename
            id
          }
        }
      },
    }
    `
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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          toasters {
            __typename
            id
          }
        }
      },
    }
    `
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
      data: {
        node: null,
      },
      errors: true,
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          node(id: "oven1") {
            __typename
          }
        }
      },
    }
    `
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
      data: {
        node: null,
      },
      errors: true,
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          node(id: "oven1") {
            __typename
            ... on Toaster {
              warranty
            }
          }
        }
      },
    }
    `
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
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          node(id: "toaster1") {
            __typename
            ... on Toaster {
              warranty
            }
          }
        }
      },
    }
    `
  ),
];
