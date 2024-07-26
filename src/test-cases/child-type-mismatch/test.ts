import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      {
        users {
          id
          name
        }
        accounts {
          ... on User {
            id
            name
          }
          ... on Admin {
            id
            name
          }
        }
      }
    `,
    {
      data: {
        users: [
          {
            id: "u1",
            name: "u1-name",
          },
        ],
        accounts: [
          {
            id: "u1",
            name: "u1-name",
          },
          {
            id: "a1",
            name: "a1-name",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Sequence {
          Fetch(service: "a") {
            {
              users {
                __typename
                id
              }
            }
          },
          Flatten(path: "users.@") {
            Fetch(service: "b") {
              {
                ... on User {
                  __typename
                  id
                }
              } =>
              {
                ... on User {
                  name
                }
              }
            },
          },
        },
        Fetch(service: "b") {
          {
            accounts {
              __typename
              ... on User {
                id
                name
              }
              ... on Admin {
                # NOTE:
                # User.id and Admin.id have similar output types,
                # but one returns a non-nullable field and the other a nullable field.
                # To avoid a GraphQL error, we need to alias the field.
                id__alias_0: id
                name
              }
            }
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query NestedInternalAlias {
        users {
          id
          name
        }
        accounts {
          ... on User {
            id
            name
            similarAccounts {
              ... on User {
                id
                name
              }
              ... on Admin {
                id
                name
              }
            }
          }
          ... on Admin {
            id
            name
            similarAccounts {
              ... on User {
                id
                name
              }
              ... on Admin {
                id
                name
              }
            }
          }
        }
      }
    `,
    {
      data: {
        users: [
          {
            id: "u1",
            name: "u1-name",
          },
        ],
        accounts: [
          {
            id: "u1",
            name: "u1-name",
            similarAccounts: [
              {
                id: "u1",
                name: "u1-name",
              },
              {
                id: "a1",
                name: "a1-name",
              },
            ],
          },
          {
            id: "a1",
            name: "a1-name",
            similarAccounts: [
              {
                id: "u1",
                name: "u1-name",
              },
              {
                id: "a1",
                name: "a1-name",
              },
            ],
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Sequence {
          Fetch(service: "a") {
            {
              users {
                __typename
                id
              }
            }
          },
          Flatten(path: "users.@") {
            Fetch(service: "b") {
              {
                ... on User {
                  __typename
                  id
                }
              } =>
              {
                ... on User {
                  name
                }
              }
            },
          },
        },
        Fetch(service: "b") {
          {
            accounts {
              __typename
              ... on User {
                id
                name
                similarAccounts {
                  __typename
                  ... on User {
                    id
                    name
                  }
                  ... on Admin {
                    id__alias_0: id
                    name
                  }
                }
              }
              ... on Admin {
                id__alias_0: id
                name
                similarAccounts {
                  __typename
                  ... on User {
                    id
                    name
                  }
                  ... on Admin {
                    id__alias_1: id
                    name
                  }
                }
              }
            }
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query DeeplyNestedInternalAlias {
        users {
          id
          name
        }
        accounts {
          ... on User {
            id
            name
            similarAccounts {
              ... on User {
                id
                name
                similarAccounts {
                  ... on User {
                    id
                    name
                  }
                  ... on Admin {
                    id
                    name
                  }
                }
              }
              ... on Admin {
                id
                name
                similarAccounts {
                  ... on User {
                    id
                    name
                  }
                  ... on Admin {
                    id
                    name
                  }
                }
              }
            }
          }
          ... on Admin {
            id
            name
            similarAccounts {
              ... on User {
                id
                name
                similarAccounts {
                  ... on User {
                    id
                    name
                  }
                  ... on Admin {
                    id
                    name
                  }
                }
              }
              ... on Admin {
                id
                name
                similarAccounts {
                  ... on User {
                    id
                    name
                  }
                  ... on Admin {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      data: {
        users: [
          {
            id: "u1",
            name: "u1-name",
          },
        ],
        accounts: [
          {
            id: "u1",
            name: "u1-name",
            similarAccounts: [
              {
                id: "u1",
                name: "u1-name",
                similarAccounts: [
                  {
                    id: "u1",
                    name: "u1-name",
                  },
                  {
                    id: "a1",
                    name: "a1-name",
                  },
                ],
              },
              {
                id: "a1",
                name: "a1-name",
                similarAccounts: [
                  {
                    id: "u1",
                    name: "u1-name",
                  },
                  {
                    id: "a1",
                    name: "a1-name",
                  },
                ],
              },
            ],
          },
          {
            id: "a1",
            name: "a1-name",
            similarAccounts: [
              {
                id: "u1",
                name: "u1-name",
                similarAccounts: [
                  {
                    id: "u1",
                    name: "u1-name",
                  },
                  {
                    id: "a1",
                    name: "a1-name",
                  },
                ],
              },
              {
                id: "a1",
                name: "a1-name",
                similarAccounts: [
                  {
                    id: "u1",
                    name: "u1-name",
                  },
                  {
                    id: "a1",
                    name: "a1-name",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Sequence {
          Fetch(service: "a") {
            {
              users {
                __typename
                id
              }
            }
          },
          Flatten(path: "users.@") {
            Fetch(service: "b") {
              {
                ... on User {
                  __typename
                  id
                }
              } =>
              {
                ... on User {
                  name
                }
              }
            },
          },
        },
        Fetch(service: "b") {
          {
            accounts {
              __typename
              ... on User {
                id
                name
                similarAccounts {
                  __typename
                  ... on User {
                    id
                    name
                    similarAccounts {
                      __typename
                      ... on User {
                        id
                        name
                      }
                      ... on Admin {
                        id__alias_0: id
                        name
                      }
                    }
                  }
                  ... on Admin {
                    id__alias_0: id
                    name
                    similarAccounts {
                      __typename
                      ... on User {
                        id
                        name
                      }
                      ... on Admin {
                        id__alias_1: id
                        name
                      }
                    }
                  }
                }
              }
              ... on Admin {
                id__alias_0: id
                name
                similarAccounts {
                  __typename
                  ... on User {
                    id
                    name
                    similarAccounts {
                      __typename
                      ... on User {
                        id
                        name
                      }
                      ... on Admin {
                        id__alias_2: id
                        name
                      }
                    }
                  }
                  ... on Admin {
                    id__alias_1: id
                    name
                    similarAccounts {
                      __typename
                      ... on User {
                        id
                        name
                      }
                      ... on Admin {
                        id__alias_3: id
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        },
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query DeeplyNested {
        accounts {
          ... on User {
            name
            similarAccounts {
              ... on User {
                name
                similarAccounts {
                  ... on User {
                    name
                  }
                  ... on Admin {
                    name
                  }
                }
              }
              ... on Admin {
                name
                similarAccounts {
                  ... on User {
                    name
                  }
                  ... on Admin {
                    name
                  }
                }
              }
            }
          }
          ... on Admin {
            name
            similarAccounts {
              ... on User {
                name
                similarAccounts {
                  ... on User {
                    name
                  }
                  ... on Admin {
                    name
                  }
                }
              }
              ... on Admin {
                name
                similarAccounts {
                  ... on User {
                    name
                  }
                  ... on Admin {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      data: {
        accounts: [
          {
            name: "u1-name",
            similarAccounts: [
              {
                name: "u1-name",
                similarAccounts: [
                  {
                    name: "u1-name",
                  },
                  {
                    name: "a1-name",
                  },
                ],
              },
              {
                name: "a1-name",
                similarAccounts: [
                  {
                    name: "u1-name",
                  },
                  {
                    name: "a1-name",
                  },
                ],
              },
            ],
          },
          {
            name: "a1-name",
            similarAccounts: [
              {
                name: "u1-name",
                similarAccounts: [
                  {
                    name: "u1-name",
                  },
                  {
                    name: "a1-name",
                  },
                ],
              },
              {
                name: "a1-name",
                similarAccounts: [
                  {
                    name: "u1-name",
                  },
                  {
                    name: "a1-name",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          accounts {
            __typename
            ... on User {
              name
              similarAccounts {
                __typename
                ... on User {
                  name
                  similarAccounts {
                    __typename
                    ... on User {
                      name
                    }
                    ... on Admin {
                      name
                    }
                  }
                }
                ... on Admin {
                  name
                  similarAccounts {
                    __typename
                    ... on User {
                      name
                    }
                    ... on Admin {
                      name
                    }
                  }
                }
              }
            }
            ... on Admin {
              name
              similarAccounts {
                __typename
                ... on User {
                  name
                  similarAccounts {
                    __typename
                    ... on User {
                      name
                    }
                    ... on Admin {
                      name
                    }
                  }
                }
                ... on Admin {
                  name
                  similarAccounts {
                    __typename
                    ... on User {
                      name
                    }
                    ... on Admin {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      },
    }
    `
  ),
];
