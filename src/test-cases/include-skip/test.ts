import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = false) {
        product {
          price
          neverCalledInclude @include(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            product {
              __typename
              id
              price
              # NOTE
              # Query planner cannot be sure if $bool is true or false
              # so it's kept in the plan
              # In order to get Product.neverCalledInclude,
              # that requires Product.isExpensive field,
              # it needs to fetch "price" first
              ... on Product @include(if: $bool) {
                __typename
                id
                price
              }
            }
          }
        },
        # NOTE
        # Interesting thing is that the query planner moves @include on top of the Sequence.
        # It makes the plan conditional on the value of $bool.
        # The execution engine will not execute the Sequence if $bool is false.
        # It's a nice feature, makes the plan easy to read and understand.
        Include(if: $bool) {
          Sequence {
            Flatten(path: "product") {
              Fetch(service: "b") {
                {
                  ... on Product {
                    __typename
                    price
                    id
                  }
                } =>
                {
                  ... on Product {
                    isExpensive
                  }
                }
              },
            },
            Flatten(path: "product") {
              Fetch(service: "c") {
                {
                  ... on Product {
                    __typename
                    isExpensive
                    id
                  }
                } =>
                {
                  ... on Product {
                    neverCalledInclude
                  }
                }
              },
            },
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = true) {
        product {
          price
          neverCalledSkip @skip(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            product {
              __typename
              id
              price
              ... on Product @skip(if: $bool) {
                __typename
                id
                price
              }
            }
          }
        },
        Skip(if: $bool) {
          Sequence {
            Flatten(path: "product") {
              Fetch(service: "b") {
                {
                  ... on Product {
                    __typename
                    price
                    id
                  }
                } =>
                {
                  ... on Product {
                    isExpensive
                  }
                }
              },
            },
            Flatten(path: "product") {
              Fetch(service: "c") {
                {
                  ... on Product {
                    __typename
                    isExpensive
                    id
                  }
                } =>
                {
                  ... on Product {
                    neverCalledSkip
                  }
                }
              },
            },
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = true) {
        product {
          price
          include @include(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
          include: true,
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            product {
              __typename
              id
              price
              ... on Product @include(if: $bool) {
                __typename
                id
                price
              }
            }
          }
        },
        Include(if: $bool) {
          Sequence {
            Flatten(path: "product") {
              Fetch(service: "b") {
                {
                  ... on Product {
                    __typename
                    price
                    id
                  }
                } =>
                {
                  ... on Product {
                    isExpensive
                  }
                }
              },
            },
            Flatten(path: "product") {
              Fetch(service: "c") {
                {
                  ... on Product {
                    __typename
                    isExpensive
                    id
                  }
                } =>
                {
                  ... on Product {
                    include
                  }
                }
              },
            },
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query ($bool: Boolean = false) {
        product {
          price
          skip @skip(if: $bool)
        }
      }
    `,
    {
      data: {
        product: {
          price: 699.99,
          skip: true,
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            product {
              __typename
              id
              price
              ... on Product @skip(if: $bool) {
                __typename
                id
                price
              }
            }
          }
        },
        Skip(if: $bool) {
          Sequence {
            Flatten(path: "product") {
              Fetch(service: "b") {
                {
                  ... on Product {
                    __typename
                    price
                    id
                  }
                } =>
                {
                  ... on Product {
                    isExpensive
                  }
                }
              },
            },
            Flatten(path: "product") {
              Fetch(service: "c") {
                {
                  ... on Product {
                    __typename
                    isExpensive
                    id
                  }
                } =>
                {
                  ... on Product {
                    skip
                  }
                }
              },
            },
          }
        },
      },
    }
    `
  ),
];
