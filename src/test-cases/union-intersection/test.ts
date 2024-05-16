import { createTest } from "../../test";
import { media } from "./data";

export default [
  createTest(
    /* GraphQL */ `
      query {
        media {
          ... on Movie {
            title
          }
        }
      }
    `,
    {
      data: {
        // This is what @apollo/gateway returns as it calls subgraph A to resolve Movie, but subgraph A doesn't have a Movie type
        media: {},
      },
    },
    /* GraphQL */ `
      QueryPlan {
        Fetch(service: "a") {
          {
            media {
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
        media {
          ... on Book {
            title
          }
        }
      }
    `,
    {
      data: {
        media: {
          // @apollo/gateway calls subgraph A as it's the first graph (alphabetically) to resolve the intersection of Media unions (Book)
          title: media.title,
        },
      },
    },
    /* GraphQL */ `
      QueryPlan {
        Fetch(service: "a") {
          {
            media {
              __typename
              ... on Book {
                title
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
        media {
          ... on Book {
            title
          }
          ... on Movie {
            title
          }
        }
      }
    `,
    {
      data: {
        media: {
          // @apollo/gateway calls subgraph A as it's the first graph (alphabetically) to resolve the intersection of Media unions (Book)
          title: media.title,
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          media {
            __typename
            ... on Book {
              title
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
        media {
          __typename
          ... on Song {
            title
          }
          ... on Movie {
            title
          }
          ... on Book {
            title
          }
        }
        book {
          __typename
          ... on Song {
            title
          }
          ... on Movie {
            title
          }
          ... on Book {
            title
          }
        }
        song {
          __typename
          ... on Song {
            title
          }
          ... on Movie {
            title
          }
          ... on Book {
            title
          }
        }
      }
    `,
    {
      data: {
        media: {
          __typename: "Book",
          title: "The Lord of the Rings",
        },
        book: {
          __typename: "Book",
          title: "The Lord of the Rings",
        },
        song: {
          __typename: "Song",
          title: "Song Title",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          song {
            __typename
            ... on Song {
              title
            }
            ... on Book {
              title
            }
          }
          media {
            __typename
            ... on Book {
              title
            }
          }
          book {
            __typename
            title
          }
        }
      },
    }
    `
  ),
];
