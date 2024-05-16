import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        me {
          id
        }
      }
    `,
    {
      data: {
        me: {
          id: "u1",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "accounts") {
        {
          me {
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
        me {
          id
          reviews {
            id
          }
        }
      }
    `,
    {
      data: {
        me: {
          id: "u1",
          reviews: [
            {
              id: "r1",
            },
            {
              id: "r2",
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "accounts") {
          {
            me {
              __typename
              id
            }
          }
        },
        Flatten(path: "me") {
          # Nothing really interesting here, just fetching User.reviews.id, because subgraph Accounts could not provide it.
          Fetch(service: "reviews") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
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
      query {
        me {
          reviews {
            id
            author {
              id
              username
            }
            product {
              inStock
            }
          }
        }
      }
    `,
    {
      data: {
        me: {
          reviews: [
            {
              id: "r1",
              author: {
                id: "u1",
                username: "u-username-1",
              },
              product: {
                inStock: true,
              },
            },
            {
              id: "r2",
              author: {
                id: "u1",
                username: "u-username-1",
              },
              product: {
                inStock: false,
              },
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "accounts") {
          {
            me {
              __typename
              id  # This is required in order to resolve the User.reviews.* fields
            }
          }
        },
        Flatten(path: "me") {
          Fetch(service: "reviews") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                reviews {
                  id
                  author {
                    id
                    username
                  }
                  product {
                    __typename
                    upc # upc is a key field of Product in subgraph Inventory
                  }
                }
              }
            }
          },
        },
        Flatten(path: "me.reviews.@.product") {
          Fetch(service: "inventory") {
            {
              ... on Product {
                __typename
                upc
              }
            } =>
            {
              ... on Product {
                inStock # it's available only in Inventory
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
        products {
          name
        }
      }
    `,
    {
      data: {
        products: [
          {
            name: "p-name-1",
          },
          {
            name: "p-name-2",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "products") {
        {
          products {
            name
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          price
        }
      }
    `,
    {
      data: {
        products: [
          {
            price: 11,
          },
          {
            price: 22,
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "products") {
        {
          products {
            price
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          shippingEstimate
        }
      }
    `,
    {
      data: {
        products: [
          {
            shippingEstimate: 110,
          },
          {
            shippingEstimate: 440,
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
              upc # upc is a key field of Product in subgraph Inventory
              price # price is required to calculate shippingEstimate
              weight # weight is required to calculate shippingEstimate
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "inventory") {
            {
              ... on Product {
                __typename
                upc
                price
                weight
              }
            } =>
            {
              ... on Product {
                shippingEstimate # got them all!
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
        products {
          shippingEstimate
          weight
          price
        }
      }
    `,
    {
      data: {
        products: [
          {
            shippingEstimate: 110,
            weight: 1,
            price: 11,
          },
          {
            shippingEstimate: 440,
            weight: 2,
            price: 22,
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
              upc
              price
              weight
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "inventory") {
            {
              ... on Product {
                __typename
                upc
                price
                weight
              }
            } =>
            {
              ... on Product {
                shippingEstimate
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
          reviews {
            id
            author {
              username
            }
            product {
              name
              shippingEstimate
            }
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            reviews: [
              {
                id: "r1",
                author: {
                  username: "u-username-1",
                },
                product: {
                  name: "p-name-1",
                  shippingEstimate: 110,
                },
              },
            ],
          },
          {
            reviews: [
              {
                id: "r2",
                author: {
                  username: "u-username-1",
                },
                product: {
                  name: "p-name-2",
                  shippingEstimate: 440,
                },
              },
            ],
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
              # We need to fetch Product.reviews.* fields from Reviews
              # upc is a key field of Product in subgraph Reviews
              upc
            }
          }
        },
        Flatten(path: "products.@") {
          Fetch(service: "reviews") {
            {
              ... on Product {
                __typename
                upc
              }
            } =>
            {
              ... on Product {
                reviews {
                  id
                  author {
                    username
                  }
                  product {
                    __typename
                    upc
                  }
                }
              }
            }
          },
        },
        # we got Product.upc from Reviews, now we can fetch name, price and weight from Products subgraph
        # as it's needed to resolve shippingEstimate
        Flatten(path: "products.@.reviews.@.product") {
          Fetch(service: "products") {
            {
              ... on Product {
                __typename
                upc
              }
            } =>
            {
              ... on Product {
                name
                price
                weight
              }
            }
          },
        },
        Flatten(path: "products.@.reviews.@.product") {
          Fetch(service: "inventory") {
            {
              ... on Product {
                __typename
                price
                weight
                upc
              }
            } =>
            {
              ... on Product {
                shippingEstimate
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
        me {
          reviews {
            product {
              reviews {
                id
              }
            }
          }
        }
      }
    `,
    {
      data: {
        me: {
          reviews: [
            {
              product: {
                reviews: [
                  {
                    id: "r1",
                  },
                ],
              },
            },
            {
              product: {
                reviews: [
                  {
                    id: "r2",
                  },
                ],
              },
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "accounts") {
          {
            me {
              __typename
              id
            }
          }
        },
        Flatten(path: "me") {
          Fetch(service: "reviews") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                reviews {
                  product {
                    reviews {
                      id
                    }
                  }
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
      query {
        me {
          reviews {
            product {
              inStock
            }
          }
        }
      }
    `,
    {
      data: {
        me: {
          reviews: [
            {
              product: {
                inStock: true,
              },
            },
            {
              product: {
                inStock: false,
              },
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "accounts") {
          {
            me {
              __typename
              id
            }
          }
        },
        Flatten(path: "me") {
          Fetch(service: "reviews") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                reviews {
                  product {
                    __typename
                    upc
                  }
                }
              }
            }
          },
        },
        Flatten(path: "me.reviews.@.product") {
          Fetch(service: "inventory") {
            {
              ... on Product {
                __typename
                upc
              }
            } =>
            {
              ... on Product {
                inStock
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
        me {
          reviews {
            product {
              shippingEstimate
            }
          }
        }
      }
    `,
    {
      data: {
        me: {
          reviews: [
            {
              product: {
                shippingEstimate: 110,
              },
            },
            {
              product: {
                shippingEstimate: 440,
              },
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "accounts") {
          {
            me {
              __typename
              id
            }
          }
        },
        Flatten(path: "me") {
          Fetch(service: "reviews") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                reviews {
                  product {
                    __typename
                    upc
                  }
                }
              }
            }
          },
        },
        Flatten(path: "me.reviews.@.product") {
          Fetch(service: "products") {
            {
              ... on Product {
                __typename
                upc
              }
            } =>
            {
              ... on Product {
                price
                weight
              }
            }
          },
        },
        Flatten(path: "me.reviews.@.product") {
          Fetch(service: "inventory") {
            {
              ... on Product {
                __typename
                price
                weight
                upc
              }
            } =>
            {
              ... on Product {
                shippingEstimate
              }
            }
          },
        },
      },
    }
    `
  ),
];
