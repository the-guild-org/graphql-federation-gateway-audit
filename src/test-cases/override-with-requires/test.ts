import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      {
        userInA {
          id
          name
          aName
          cName
        }
        userInB {
          id
          name
          aName
          cName
        }
        userInC {
          id
          name
          aName
          cName
        }
      }
    `,
    {
      data: {
        userInA: {
          id: "u1",
          name: "u1-name",
          aName: "a__u1-name",
          cName: "c__u1-name",
        },
        userInB: {
          id: "u2",
          name: "u2-name",
          aName: "a__u2-name",
          cName: "c__u2-name",
        },
        userInC: {
          id: "u3",
          name: "u3-name",
          aName: "a__u3-name",
          cName: "c__u3-name",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Sequence {
          Fetch(service: "a") {
            {
              userInA {
                __typename
                id
              }
            }
          },
          Flatten(path: "userInA") {
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
          Parallel {
            Flatten(path: "userInA") {
              Fetch(service: "a") {
                {
                  ... on User {
                    __typename
                    name
                    id
                  }
                } =>
                {
                  ... on User {
                    aName
                  }
                }
              },
            },
            Flatten(path: "userInA") {
              Fetch(service: "c") {
                {
                  ... on User {
                    __typename
                    name
                    id
                  }
                } =>
                {
                  ... on User {
                    cName
                  }
                }
              },
            },
          },
        },
        Sequence {
          Fetch(service: "b") {
            {
              userInB {
                __typename
                id
                name
              }
            }
          },
          Parallel {
            Flatten(path: "userInB") {
              Fetch(service: "c") {
                {
                  ... on User {
                    __typename
                    id
                    name
                  }
                } =>
                {
                  ... on User {
                    cName
                  }
                }
              },
            },
            Flatten(path: "userInB") {
              Fetch(service: "a") {
                {
                  ... on User {
                    __typename
                    id
                    name
                  }
                } =>
                {
                  ... on User {
                    aName
                  }
                }
              },
            },
          },
        },
        Sequence {
          Fetch(service: "c") {
            {
              userInC {
                __typename
                id
              }
            }
          },
          Flatten(path: "userInC") {
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
          Parallel {
            Flatten(path: "userInC") {
              Fetch(service: "c") {
                {
                  ... on User {
                    __typename
                    name
                    id
                  }
                } =>
                {
                  ... on User {
                    cName
                  }
                }
              },
            },
            Flatten(path: "userInC") {
              Fetch(service: "a") {
                {
                  ... on User {
                    __typename
                    name
                    id
                  }
                } =>
                {
                  ... on User {
                    aName
                  }
                }
              },
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
        userInC {
          cName
        }
      }
    `,
    {
      data: {
        userInC: {
          cName: "c__u3-name",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "c") {
          {
            userInC {
              __typename
              id
            }
          }
        },
        Flatten(path: "userInC") {
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
        Flatten(path: "userInC") {
          Fetch(service: "c") {
            {
              ... on User {
                __typename
                name
                id
              }
            } =>
            {
              ... on User {
                cName
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
        userInA {
          cName
        }
      }
    `,
    {
      data: {
        userInA: {
          cName: "c__u1-name",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            userInA {
              __typename
              id
            }
          }
        },
        Flatten(path: "userInA") {
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
        Flatten(path: "userInA") {
          Fetch(service: "c") {
            {
              ... on User {
                __typename
                name
                id
              }
            } =>
            {
              ... on User {
                cName
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
        userInA {
          aName
        }
      }
    `,
    {
      data: {
        userInA: {
          aName: "a__u1-name",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            userInA {
              __typename
              id
            }
          }
        },
        Flatten(path: "userInA") {
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
        Flatten(path: "userInA") {
          Fetch(service: "a") {
            {
              ... on User {
                __typename
                name
                id
              }
            } =>
            {
              ... on User {
                aName
              }
            }
          },
        },
      },
    }
    `
  ),
];
