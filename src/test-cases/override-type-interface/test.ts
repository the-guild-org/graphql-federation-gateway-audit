import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        feed {
          id
          createdAt
        }
      }
    `,
    {
      data: {
        feed: [
          {
            id: "i1",
            createdAt: "i1-createdAt",
          },
          {
            id: "i2",
            createdAt: "i2-createdAt",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            feed {
              __typename
              id
              ... on ImagePost {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "feed.@") {
          Fetch(service: "b") {
            {
              ... on ImagePost {
                __typename
                id
              }
            } =>
            {
              ... on ImagePost {
                createdAt
              }
            }
          },
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        feed {
          ... on TextPost {
            id
            body
          }
        }
      }
    `,
    {
      data: {
        feed: [{}, {}],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          feed {
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
        anotherFeed {
          createdAt
        }
      }
    `,
    {
      data: {
        anotherFeed: [
          {
            createdAt: "i1-createdAt",
          },
          {
            createdAt: "i2-createdAt",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          anotherFeed {
            __typename
            createdAt
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      {
        anotherFeed {
          createdAt
          id
          ... on ImagePost {
            createdAt
            id
          }
        }
      }
    `,
    {
      data: {
        anotherFeed: [
          {
            createdAt: "i1-createdAt",
            id: "i1",
          },
          {
            createdAt: "i2-createdAt",
            id: "i2",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          anotherFeed {
            __typename
            createdAt
            id
            ... on ImagePost {
              createdAt
              id
            }
          }
        }
      },
    }
    `
  ),
];
