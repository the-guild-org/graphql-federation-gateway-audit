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
    }
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
    }
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
    }
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
    }
  ),
];
