import { createTest } from "../../testkit.js";
import { media } from "./data.js";

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
        media: {},
      },
    },
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
          title: media.title,
        },
      },
    },
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
          title: media.title,
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        viewer {
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
      }
    `,
    {
      data: {
        viewer: {
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
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        viewer {
          media {
            ... on Movie {
              title
            }
          }
        }
      }
    `,
    {
      data: {
        viewer: {
          media: {},
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        viewer {
          media {
            ... on Book {
              title
            }
          }
        }
      }
    `,
    {
      data: {
        viewer: {
          media: {
            title: media.title,
          },
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        viewer {
          media {
            ... on Book {
              title
            }
            ... on Movie {
              title
            }
          }
        }
      }
    `,
    {
      data: {
        viewer: {
          media: {
            title: media.title,
          },
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        viewer {
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
      }
    `,
    {
      data: {
        viewer: {
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
    },
  ),
];
