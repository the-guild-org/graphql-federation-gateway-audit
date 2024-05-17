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
            # NOTE
            # Query.feed is only available in subgraph A.
            # Post.createdAt is available in subgraph A for ImagePost.createdAt.
            # ImagePost.createdAt is available in subgraph B.
            # Subgraph B overrides ImagePost.createdAt from subgraph A.
            # ImagePost.createdAt from subgraph A should never be used,
            # it should always be routed to subgraph B.
            feed {
              __typename
              id
              # Query.feed resolves only the ImagePost type.
              # It's the only type that implements Post in subgraph A.
              # In order to route to subgraph B, to resolve ImagePost.createdAt
              # we need to make sure the returned type is ImagePost (hance the __typename),
              # and we need the "id" field to be able to perform the entity call.
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
                # ImagePost.createdAt is fetched from subgraph B
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
            # Query.feed resolves Post interface,
            # but the only type that implements Post in subgraph A is ImagePost.
            # Query planner knows it and makes an empty (__typename) query to subgraph A.
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
