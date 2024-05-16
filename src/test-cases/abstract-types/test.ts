import { createTest } from "../../test";

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
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "products") {
        {
          products {
            __typename
            id
            dimensions {
              size
              weight
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
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "products") {
        {
          similar(id: "p1") {
            __typename
            id
            sku
          }
        }
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            book: similar(id: "p1") {
              __typename
              id
              sku
              ... on Book {
                __typename
                id
                dimensions {
                  size
                  weight
                }
              }
              ... on Magazine {
                __typename
                id
                dimensions {
                  size
                  weight
                }
              }
            }
            magazine: similar(id: "p2") {
              __typename
              id
              sku
              ... on Book {
                __typename
                id
                dimensions {
                  size
                  weight
                }
              }
              ... on Magazine {
                __typename
                id
                dimensions {
                  size
                  weight
                }
              }
            }
          }
        },
        Parallel {
          Flatten(path: "book.@") {
            Fetch(service: "inventory") {
              {
                ... on Book {
                  __typename
                  id
                  dimensions {
                    size
                    weight
                  }
                }
                ... on Magazine {
                  __typename
                  id
                  dimensions {
                    size
                    weight
                  }
                }
              } =>
              {
                ... on Book {
                  delivery(zip: "1234") {
                    fastestDelivery
                    estimatedDelivery
                  }
                }
                ... on Magazine {
                  delivery(zip: "1234") {
                    fastestDelivery
                    estimatedDelivery
                  }
                }
              }
            },
          },
          Flatten(path: "magazine.@") {
            Fetch(service: "inventory") {
              {
                ... on Book {
                  __typename
                  id
                  dimensions {
                    size
                    weight
                  }
                }
                ... on Magazine {
                  __typename
                  id
                  dimensions {
                    size
                    weight
                  }
                }
              } =>
              {
                ... on Book {
                  delivery(zip: "1234") {
                    fastestDelivery
                    estimatedDelivery
                  }
                }
                ... on Magazine {
                  delivery(zip: "1234") {
                    fastestDelivery
                    estimatedDelivery
                  }
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "products") {
        {
          products {
            __typename
            sku
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
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              author: createdBy {
                email
                totalProductsCreated
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "magazines") {
            {
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Magazine {
                title
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    ... on Book {
                      __typename
                      id
                      reviewsCount
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    ... on Book {
                      __typename
                      id
                      reviewsCount
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Book {
                  __typename
                  id
                }
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Book {
                  sku
                }
                ... on Magazine {
                  sku
                }
              }
            },
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "magazines") {
              {
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Magazine {
                  title
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  id
                }
              }
              ... on Magazine {
                reviews {
                  id
                }
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Include(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Magazine {
                  sku
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Include(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Magazine {
                  sku
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Skip(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Magazine {
                  sku
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Skip(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Magazine {
                  sku
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Skip(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Book {
                  __typename
                  id
                }
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Book {
                  sku
                }
                ... on Magazine {
                  sku
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @skip(if: $title) {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Skip(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Book {
                  __typename
                  id
                }
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Book {
                  sku
                }
                ... on Magazine {
                  sku
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Book {
                  __typename
                  id
                }
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Book @include(if: $title) {
                  sku
                }
                ... on Magazine {
                  sku
                }
              }
            },
          },
          Include(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                      ... on Book @skip(if: $title) {
                        __typename
                        id
                      }
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Book @include(if: $title) {
                      __typename
                      id
                      ... on Book @skip(if: $title) {
                        __typename
                        id
                      }
                    }
                    ... on Magazine {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Parallel {
          Include(if: $title) {
            Flatten(path: "products.@.reviews.@.product") {
              Fetch(service: "books") {
                {
                  ... on Book {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Book {
                    title
                  }
                }
              },
            }
          },
          Flatten(path: "products.@.reviews.@.product") {
            Fetch(service: "products") {
              {
                ... on Book {
                  ... on Book {
                    __typename
                    id
                  }
                }
                ... on Magazine {
                  __typename
                  id
                }
              } =>
              {
                ... on Book @include(if: $title) {
                  ... on Book @skip(if: $title) {
                    sku
                  }
                }
                ... on Magazine {
                  sku
                }
              }
            },
          },
        },
      },
    }
    `
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Magazine {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Magazine {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Flatten(path: "products.@.reviews.@.product") {
          Fetch(service: "products") {
            {
              ... on Magazine {
                __typename
                id
              }
              ... on Book {
                __typename
                id
              }
            } =>
            {
              ... on Magazine {
                publisherType {
                  __typename
                  ...Publisher
                  ... on Agency {
                    __typename
                  }
                }
              }
              ... on Book {
                publisherType {
                  __typename
                  ...Publisher
                  ... on Agency {
                    __typename
                  }
                }
              }
            }
            
            fragment Publisher on PublisherType {
              ... on Agency {
                id
              }
              ... on Self {
                email
              }
            }
          },
        },
        Flatten(path: "products.@.reviews.@.product.publisherType") {
          Fetch(service: "agency") {
            {
              ... on Agency {
                __typename
                id
              }
            } =>
            {
              ... on Agency {
                companyName
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
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            products {
              __typename
              id
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Book {
                __typename
                id
              }
              ... on Magazine {
                __typename
                id
              }
            } =>
            {
              ... on Book {
                reviews {
                  product {
                    __typename
                    id
                    ... on Magazine {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                  }
                }
              }
              ... on Magazine {
                reviews {
                  product {
                    __typename
                    id
                    ... on Magazine {
                      __typename
                      id
                    }
                    ... on Book {
                      __typename
                      id
                    }
                  }
                }
              }
            }
          },
        },
        Flatten(path: "products.@.reviews.@.product") {
          Fetch(service: "products") {
            {
              ... on Magazine {
                __typename
                id
              }
              ... on Book {
                __typename
                id
              }
            } =>
            {
              ... on Magazine {
                publisherType {
                  __typename
                  ...Publisher
                  ... on Agency {
                    __typename
                  }
                }
              }
              ... on Book {
                publisherType {
                  __typename
                  ...Publisher
                  ... on Agency {
                    __typename
                  }
                }
              }
            }
            
            fragment Publisher on PublisherType {
              ... on Agency {
                id
              }
              ... on Self {
                email
              }
            }
          },
        },
        Flatten(path: "products.@.reviews.@.product.publisherType") {
          Fetch(service: "agency") {
            {
              ... on Agency {
                __typename
                id
              }
            } =>
            {
              ... on Agency {
                companyName
              }
            }
          },
        },
      },
    }
    `
  ),
];
