import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        b {
          id
          data {
            __typename
          }
        }
        bb {
          id
          data {
            __typename
          }
        }
      }
    `,
    {
      data: {
        b: {
          id: "e1",
          data: null,
        },
        bb: {
          id: "e2",
          data: {
            __typename: "Qux",
          },
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            b {
              __typename
              id
            }
            bb {
              __typename
              id
            }
          }
        },
        Parallel {
          Flatten(path: "b") {
            Fetch(service: "a") {
              {
                ... on Entity {
                  __typename
                  id
                }
              } =>
              {
                ... on Entity {
                  data {
                    __typename
                  }
                }
              }
            },
          },
          Flatten(path: "bb") {
            Fetch(service: "a") {
              {
                ... on Entity {
                  __typename
                  id
                }
              } =>
              {
                ... on Entity {
                  data {
                    __typename
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
      query {
        a {
          requirer
        }
      }
    `,
    {
      data: {
        a: {
          requirer: "q1-foo_requirer",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            a {
              __typename
              id
              data {
                __typename
                foo
                ... on Bar {
                  __typename
                  bar
                  ... on Baz {
                    baz
                  }
                  ... on Qux {
                    qux
                  }
                }
              }
            }
          }
        },
        Flatten(path: "a") {
          Fetch(service: "b") {
            {
              ... on Entity {
                __typename
                id
                data {
                  foo
                  ... on Bar {
                    bar
                    ... on Baz {
                      baz
                    }
                    ... on Qux {
                      qux
                    }
                  }
                }
              }
            } =>
            {
              ... on Entity {
                requirer
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
        a {
          data {
            __typename
          }
          requirer
        }
      }
    `,
    {
      data: {
        a: {
          data: {
            __typename: "Qux",
          },
          requirer: "q1-foo_requirer",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            a {
              __typename
              id
              data {
                __typename
                foo
                ... on Bar {
                  __typename
                  bar
                  ... on Baz {
                    baz
                  }
                  ... on Qux {
                    qux
                  }
                }
              }
            }
          }
        },
        Flatten(path: "a") {
          Fetch(service: "b") {
            {
              ... on Entity {
                __typename
                id
                data {
                  foo
                  ... on Bar {
                    bar
                    ... on Baz {
                      baz
                    }
                    ... on Qux {
                      qux
                    }
                  }
                }
              }
            } =>
            {
              ... on Entity {
                requirer
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
        bb {
          data {
            __typename
          }
          requirer
        }
      }
    `,
    {
      data: {
        bb: {
          data: {
            __typename: "Qux",
          },
          requirer: "q1-foo_requirer",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            bb {
              __typename
              id
            }
          }
        },
        Flatten(path: "bb") {
          Fetch(service: "a") {
            {
              ... on Entity {
                __typename
                id
              }
            } =>
            {
              ... on Entity {
                data {
                  __typename
                  foo
                  ... on Bar {
                    __typename
                    bar
                    ... on Baz {
                      baz
                    }
                    ... on Qux {
                      qux
                    }
                  }
                }
              }
            }
          },
        },
        Flatten(path: "bb") {
          Fetch(service: "b") {
            {
              ... on Entity {
                __typename
                data {
                  foo
                  ... on Bar {
                    bar
                    ... on Baz {
                      baz
                    }
                    ... on Qux {
                      qux
                    }
                  }
                }
                id
              }
            } =>
            {
              ... on Entity {
                requirer
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
        b {
          data {
            __typename
          }
          requirer
        }
      }
    `,
    {
      data: {
        b: {
          data: null,
          requirer: "b1-foo_requirer",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            b {
              __typename
              id
            }
          }
        },
        Flatten(path: "b") {
          Fetch(service: "a") {
            {
              ... on Entity {
                __typename
                id
              }
            } =>
            {
              ... on Entity {
                data {
                  __typename
                  foo
                  ... on Bar {
                    __typename
                    bar
                    ... on Baz {
                      baz
                    }
                    ... on Qux {
                      qux
                    }
                  }
                }
              }
            }
          },
        },
        Flatten(path: "b") {
          Fetch(service: "b") {
            {
              ... on Entity {
                __typename
                data {
                  foo
                  ... on Bar {
                    bar
                    ... on Baz {
                      baz
                    }
                    ... on Qux {
                      qux
                    }
                  }
                }
                id
              }
            } =>
            {
              ... on Entity {
                requirer
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
        bb {
          data {
            __typename
          }
          requirer2
        }
      }
    `,
    {
      data: {
        bb: {
          data: {
            __typename: "Qux",
          },
          requirer2: "q1-foo_requirer2",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            bb {
              __typename
              id
            }
          }
        },
        Flatten(path: "bb") {
          Fetch(service: "a") {
            {
              ... on Entity {
                __typename
                id
              }
            } =>
            {
              ... on Entity {
                data {
                  __typename
                  foo
                }
              }
            }
          },
        },
        Flatten(path: "bb") {
          Fetch(service: "b") {
            {
              ... on Entity {
                __typename
                data {
                  ... on Foo {
                    foo
                  }
                }
                id
              }
            } =>
            {
              ... on Entity {
                requirer2
              }
            }
          },
        },
      },
    }
    `
  ),
];
