import { createTest } from "../test";

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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  ),
];
