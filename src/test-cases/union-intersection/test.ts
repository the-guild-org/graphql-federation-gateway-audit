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
    }
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
    }
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
    }
  ),
];
