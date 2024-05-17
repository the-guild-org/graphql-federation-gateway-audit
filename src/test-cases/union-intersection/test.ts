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
              # NOTE
              # Query.media returns an intersection of Media union from A and B subgraphs 
              # Movie is only available in subgraph B
              # Query planner could remove Movie from the query, but then the selection set would be empty.
              # If it would not route the request there and simply return an empty object, the effect would be the same.
              # I guess the query planner still want to make a request to subgraph A to see if it can resolve anything.
              # One reason could be that Query.media requires authentication and it does not want to overwrite that logic,
              # as it could possibly lead to successful request, even though the response should contain an error.
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
            # NOTE
            # Query.song is only resolved in subgraph A
            # Media = Book | Song in subgraph A
            # Movie was removed from the query as it cannot be resolved by Query.song
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
            # NOTE
            # Movie and Song was removed from the query
            # The only type that is common to Query.media in all subgraphs is Book
            ... on Book {
              title
            }
          }
          book {
            # NOTE
            # Query.book resolves Book, not an abstract type, in subgraph A
            # Query.book resolves Media = Book | Movie in subgraph B
            # The only possible type here is Book
            __typename
            title
          }
        }
      },
    }
    `
  ),
];
