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
            # NOTE
            # not sure to be honest why it converts ...Node to ...Over and ...Toaster
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
            # NOTE
            # It drops ...Over from the query as it does not implement Node interface in subgraph A
            # and Query.nodes resolves [Node]
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
            # NOTE
            # It merges selection sets from fragments
            # to optimize the payload size I guess
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
            # NOTE
            # It knows that Over is not implemented in subgraph A
            # but it still sends the query to subgraph A.
            # Not sure why it does that, it could be prevented by the gateway.
            # It's really not spec complaint to have an interface in GraphQL API without any implementation.
            # I know Arda had a case where a Java implementation allowed for that, but that's incorrect...
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
