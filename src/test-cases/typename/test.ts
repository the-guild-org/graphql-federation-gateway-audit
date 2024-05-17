import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        union {
          __typename
          typename: __typename
        }
      }
    `,
    {
      data: {
        union: {
          __typename: "Oven",
          typename: "Oven",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          union {
            __typename
            typename: __typename
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        interface {
          id
          __typename
          typename: __typename
          t: __typename
        }
      }
    `,
    {
      data: {
        interface: {
          id: "2",
          __typename: "Toaster",
          typename: "Toaster",
          t: "Toaster",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          interface {
            __typename
            id
            typename: __typename
            t: __typename
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        union {
          __typename
          ... on Oven {
            typename: __typename
          }
          ... on Toaster {
            typename: __typename
          }
        }
      }
    `,
    {
      data: {
        union: {
          __typename: "Oven",
          typename: "Oven",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          union {
            __typename
            ... on Oven {
              typename: __typename
            }
            ... on Toaster {
              typename: __typename
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
        interface {
          __typename
          ... on Oven {
            typename: __typename
          }
          ... on Toaster {
            typename: __typename
          }
        }
      }
    `,
    {
      data: {
        interface: {
          __typename: "Toaster",
          typename: "Toaster",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          interface {
            __typename
            ... on Oven {
              typename: __typename
            }
            ... on Toaster {
              typename: __typename
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
        users {
          id
        }
      }
    `,
    {
      data: {
        users: [
          {
            id: "u1",
          },
          {
            id: "u2",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          users {
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
        users {
          __typename
        }
      }
    `,
    {
      data: {
        users: [
          {
            __typename: "Admin",
          },
          {
            __typename: "Admin",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            # NOTE
            # it starts here, with an @interfaceObject
            users {
              # @interfaceObject cannot resolve correct __typename as it's an object type that mimics an interface
              __typename
              id
            }
          }
        },
        Flatten(path: "users.@") {
          Fetch(service: "a") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                # NOTE
                # that's why it needs to be resolved in subgraph A (via entity call), in the actual object type
                __typename
              }
            }
          },
        },
      },
    }
    `
  ),
];
