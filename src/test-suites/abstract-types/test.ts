import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          dimensions {
            size
            weight
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            dimensions: {
              size: "small",
              weight: 0.5,
            },
          },
          {
            id: "p3",
            dimensions: {
              size: "small",
              weight: 0.6,
            },
          },
          {
            id: "p2",
            dimensions: {
              size: "small",
              weight: 0.2,
            },
          },
          {
            id: "p4",
            dimensions: {
              size: "small",
              weight: 0.3,
            },
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        similar(id: "p1") {
          id
          sku
        }
      }
    `,
    {
      data: {
        similar: [
          {
            id: "p3",
            sku: "sku-3",
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        book: similar(id: "p1") {
          id
          sku
          delivery(zip: "1234") {
            fastestDelivery
            estimatedDelivery
          }
        }
        magazine: similar(id: "p2") {
          id
          sku
          delivery(zip: "1234") {
            fastestDelivery
            estimatedDelivery
          }
        }
      }
    `,
    {
      data: {
        book: [
          {
            id: "p3",
            sku: "sku-3",
            delivery: {
              fastestDelivery: "same day",
              estimatedDelivery: "1 day",
            },
          },
        ],
        magazine: [
          {
            id: "p4",
            sku: "sku-4",
            delivery: {
              fastestDelivery: "same day",
              estimatedDelivery: "1 day",
            },
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      {
        products {
          sku
          ... on Product {
            sku
          }
          ... on Book {
            sku
          }
          ... on Magazine {
            sku
          }
          ... on Similar {
            __typename
            type: __typename
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            sku: "sku-1",
            __typename: "Book",
            type: "Book",
          },
          {
            sku: "sku-3",
            __typename: "Book",
            type: "Book",
          },
          {
            sku: "sku-2",
            __typename: "Magazine",
            type: "Magazine",
          },
          {
            sku: "sku-4",
            __typename: "Magazine",
            type: "Magazine",
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      {
        products {
          author: createdBy {
            email
            totalProductsCreated
          }
          ... on Magazine {
            title
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            author: {
              email: "u1@example.com",
              totalProductsCreated: 2,
            },
          },
          {
            author: {
              email: "u2@example.com",
              totalProductsCreated: 2,
            },
          },
          {
            author: {
              email: "u1@example.com",
              totalProductsCreated: 2,
            },
            title: "Magazine 1",
          },
          {
            author: {
              email: "u2@example.com",
              totalProductsCreated: 2,
            },
            title: "Magazine 2",
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      {
        products {
          id
          reviews {
            product {
              sku
              ... on Magazine {
                title
              }
              ... on Book {
                reviewsCount
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  sku: "sku-1",
                  reviewsCount: 2,
                },
              },
              {
                product: {
                  sku: "sku-1",
                  reviewsCount: 2,
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  sku: "sku-2",
                  title: "Magazine 1",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      {
        products {
          id
          reviews {
            id
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                id: 1,
              },
              {
                id: 2,
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                id: 3,
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = true) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @include(if: $title) {
                title
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                },
              },
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = false) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @include(if: $title) {
                title
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                },
              },
              {
                product: {
                  id: "p1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = false) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @skip(if: $title) {
                title
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                },
              },
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = true) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @skip(if: $title) {
                title
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                },
              },
              {
                product: {
                  id: "p1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = true) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @skip(if: $title) {
                title
              }
              ... on Book {
                sku
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  sku: "sku-1",
                },
              },
              {
                product: {
                  id: "p1",
                  sku: "sku-1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = false) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @skip(if: $title) {
                title
              }
              ... on Book {
                sku
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                  sku: "sku-1",
                },
              },
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                  sku: "sku-1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = true) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @include(if: $title) {
                title
                ... on Book {
                  sku
                }
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                  sku: "sku-1",
                },
              },
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                  sku: "sku-1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query ($title: Boolean = true) {
        products {
          id
          reviews {
            product {
              id
              ... on Book @include(if: $title) {
                title
                ... on Book @skip(if: $title) {
                  sku
                }
              }
              ... on Magazine {
                sku
              }
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                },
              },
              {
                product: {
                  id: "p1",
                  title: "Book 1",
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  sku: "sku-2",
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      {
        products {
          id
          reviews {
            product {
              id
              ... on Magazine {
                publisherType {
                  ...Publisher
                }
              }
              ... on Book {
                publisherType {
                  ...Publisher
                }
              }
            }
          }
        }
      }

      fragment Publisher on PublisherType {
        ... on Agency {
          id
          companyName
        }
        ... on Self {
          email
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  publisherType: {
                    email: "u1@example.com",
                  },
                },
              },
              {
                product: {
                  id: "p1",
                  publisherType: {
                    email: "u1@example.com",
                  },
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  publisherType: {
                    id: "a1",
                    companyName: "Agency 1",
                  },
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      {
        products {
          id
          reviews {
            product {
              id
              ... on Magazine {
                publisherType {
                  ...Publisher
                }
              }
              ... on Book {
                publisherType {
                  ...Publisher
                }
              }
            }
          }
        }
      }

      fragment Publisher on PublisherType {
        ... on Agency {
          id
          companyName
        }
        ... on Self {
          email
        }
        ... on Group {
          name
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  id: "p1",
                  publisherType: {
                    email: "u1@example.com",
                  },
                },
              },
              {
                product: {
                  id: "p1",
                  publisherType: {
                    email: "u1@example.com",
                  },
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  id: "p2",
                  publisherType: {
                    id: "a1",
                    companyName: "Agency 1",
                  },
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      {
        products {
          id
          reviews {
            product {
              id
              ... on Magazine {
                publisherType {
                  ...Publisher
                }
              }
              ... on Book {
                publisherType {
                  ...Publisher
                }
              }
            }
          }
        }
      }

      fragment Publisher on PublisherType {
        ... on Agency {
          email {
            address
          }
        }
        ... on Self {
          email
        }
        ... on Group {
          email
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "p1",
            reviews: [
              {
                product: {
                  publisherType: {
                    email: "u1@example.com",
                  },
                },
              },
              {
                product: {
                  publisherType: {
                    email: "u1@example.com",
                  },
                },
              },
            ],
          },
          {
            id: "p3",
            reviews: [],
          },
          {
            id: "p2",
            reviews: [
              {
                product: {
                  publisherType: {
                    email: {
                      address: "a1@example.com"
                    }
                  },
                },
              },
            ],
          },
          {
            id: "p4",
            reviews: [],
          },
        ],
      },
    },
  ),
];
