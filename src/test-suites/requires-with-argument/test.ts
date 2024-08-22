import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        products {
          upc
          name
          shippingEstimate
        }
      }
    `,
    {
      data: {
        products: [
          {
            upc: "p1",
            name: "p-name-1",
            shippingEstimate: 110,
          },
          {
            upc: "p2",
            name: "p-name-2",
            shippingEstimate: 440,
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      {
        feed {
          author {
            id
          }
        }
      }
    `,
    {
      data: {
        feed: [
          {
            author: {
              id: "a2",
            },
          },
          {
            author: {
              id: "a1",
            },
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        feed {
          author {
            id
          }
          comments(limit: 1) {
            id
          }
        }
      }
    `,
    {
      data: {
        feed: [
          {
            author: {
              id: "a2",
            },
            comments: [
              {
                id: "c1",
              },
            ],
          },
          {
            author: {
              id: "a1",
            },
            comments: [
              {
                id: "c4",
              },
            ],
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query ($limit: Int = 1) {
        feed {
          author {
            id
          }
          comments(limit: $limit) {
            id
          }
        }
      }
    `,
    {
      data: {
        feed: [
          {
            author: {
              id: "a2",
            },
            comments: [
              {
                id: "c1",
              },
            ],
          },
          {
            author: {
              id: "a1",
            },
            comments: [
              {
                id: "c4",
              },
            ],
          },
        ],
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query ($limit: Int = 1) {
        feed {
          author {
            id
          }
          ...Foo
          ...Bar
        }
      }

      fragment Foo on Post {
        comments(limit: $limit) {
          id
        }
      }

      fragment Bar on Post {
        comments(limit: $limit) {
          id
        }
      }
    `,
    {
      data: {
        feed: [
          {
            author: {
              id: "a2",
            },
            comments: [
              {
                id: "c1",
              },
            ],
          },
          {
            author: {
              id: "a1",
            },
            comments: [
              {
                id: "c4",
              },
            ],
          },
        ],
      },
    }
  ),
];
