import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        anotherUsers {
          id
          name
          username
        }
      }
    `,
    {
      data: {
        anotherUsers: [
          {
            id: "u1",
            name: "u1-name",
            username: "u1-username",
          },
          {
            id: "u2",
            name: "u2-name",
            username: "u2-username",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            anotherUsers {
              __typename
              id
              username
            }
          }
        },
        Flatten(path: "anotherUsers.@") {
          Fetch(service: "a") {
            {
              ... on NodeWithName {
                __typename
                id
              }
            } =>
            {
              ... on NodeWithName {
                __typename
                name
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
        users {
          id
          name
          username
        }
      }
    `,
    {
      data: {
        users: [
          {
            id: "u1",
            name: "u1-name",
            username: "u1-username",
          },
          {
            id: "u2",
            name: "u2-name",
            username: "u2-username",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            users {
              __typename
              id
              name
            }
          }
        },
        Flatten(path: "users.@") {
          Fetch(service: "b") {
            {
              ... on NodeWithName {
                __typename
                id
              }
            } =>
            {
              ... on NodeWithName {
                username
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
        anotherUsers {
          ... on User {
            age
          }
        }
      }
    `,
    {
      data: {
        anotherUsers: [
          {
            age: 11,
          },
          {
            age: 22,
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            anotherUsers {
              __typename
              id
            }
          }
        },
        Flatten(path: "anotherUsers.@") {
          Fetch(service: "a") {
            {
              ... on NodeWithName {
                __typename
                id
              }
            } =>
            {
              ... on NodeWithName {
                __typename
                ... on User {
                  age
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
        users {
          ... on User {
            age
          }
        }
      }
    `,
    {
      data: {
        users: [
          {
            age: 11,
          },
          {
            age: 22,
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          users {
            __typename
            ... on User {
              age
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
        anotherUsers {
          ... on User {
            age
            id
            name
            username
          }
          id
          name
        }
      }
    `,
    {
      data: {
        anotherUsers: [
          {
            age: 11,
            id: "u1",
            name: "u1-name",
            username: "u1-username",
          },
          {
            age: 22,
            id: "u2",
            name: "u2-name",
            username: "u2-username",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            anotherUsers {
              __typename
              id
            }
          }
        },
        Flatten(path: "anotherUsers.@") {
          Fetch(service: "a") {
            {
              ... on NodeWithName {
                __typename
                id
              }
            } =>
            {
              ... on NodeWithName {
                __typename
                ... on User {
                  age
                  name
                }
                name
              }
            }
          },
        },
        Flatten(path: "anotherUsers.@") {
          Fetch(service: "b") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on NodeWithName {
                id
                username
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
        users {
          ... on User {
            age
            id
            name
            username
          }
          id
          name
        }
      }
    `,
    {
      data: {
        users: [
          {
            age: 11,
            id: "u1",
            name: "u1-name",
            username: "u1-username",
          },
          {
            age: 22,
            id: "u2",
            name: "u2-name",
            username: "u2-username",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            users {
              __typename
              ... on User {
                __typename
                id
                age
                name
              }
              id
              name
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
              ... on NodeWithName {
                username
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
        users {
          ... on User {
            age
            id
            name
            username
          }
          id
          name
        }
      }
    `,
    {
      data: {
        users: [
          {
            age: 11,
            id: "u1",
            name: "u1-name",
            username: "u1-username",
          },
          {
            age: 22,
            id: "u2",
            name: "u2-name",
            username: "u2-username",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            users {
              __typename
              ... on User {
                __typename
                id
                age
                name
              }
              id
              name
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
              ... on NodeWithName {
                username
              }
            }
          },
        },
      },
    }
    `
  ),
  // Should be resolved by subgraph b, without any entity calls
  createTest(
    /* GraphQL */ `
      query {
        accounts {
          name
        }
      }
    `,
    {
      data: {
        accounts: [
          {
            name: "Alice",
          },
          {
            name: "Bob",
          },
          {
            name: "Charlie",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          accounts {
            name
          }
        }
      },
    }
    `
  ),
  // Should be resolved by subgraph b, with entity calls to subgraph a
  // as interfaceObject does not know the __typename
  createTest(
    /* GraphQL */ `
      query {
        accounts {
          ... on Admin {
            name
          }
        }
      }
    `,
    {
      data: {
        accounts: [
          {
            name: "Alice",
          },
          {
            name: "Bob",
          },
          {},
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            accounts {
              __typename
              id
            }
          }
        },
        Flatten(path: "accounts.@") {
          Fetch(service: "a") {
            {
              ... on Account {
                __typename
                id
              }
            } =>
            {
              ... on Account {
                __typename
              }
            }
          },
        },
        Flatten(path: "accounts.@") {
          Fetch(service: "b") {
            {
              ... on Admin {
                __typename
                id
              }
            } =>
            {
              ... on Account {
                name
              }
            }
          },
        },
      },
    }
    `
  ),
  // Should be resolved by subgraph b, with entity calls to subgraph a
  // to resolve __typename (interfaceObject does not know the __typename)
  createTest(
    /* GraphQL */ `
      query {
        accounts {
          name
          __typename
        }
      }
    `,
    {
      data: {
        accounts: [
          {
            name: "Alice",
            __typename: "Admin",
          },
          {
            name: "Bob",
            __typename: "Admin",
          },
          {
            name: "Charlie",
            __typename: "Regular",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            accounts {
              __typename
              id
              name
            }
          }
        },
        Flatten(path: "accounts.@") {
          Fetch(service: "a") {
            {
              ... on Account {
                __typename
                id
              }
            } =>
            {
              ... on Account {
                __typename
              }
            }
          },
        },
      },
    }
    `
  ),
  // Should be resolved by subgraph b, with entity calls to subgraph a
  // to resolve __typename (interfaceObject does not know the __typename)
  createTest(
    /* GraphQL */ `
      query {
        accounts {
          ... on Admin {
            __typename
          }
        }
      }
    `,
    {
      data: {
        accounts: [
          {
            __typename: "Admin",
          },
          {
            __typename: "Admin",
          },
          {},
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            accounts {
              __typename
              id
            }
          }
        },
        Flatten(path: "accounts.@") {
          Fetch(service: "a") {
            {
              ... on Account {
                __typename
                id
              }
            } =>
            {
              ... on Account {
                __typename
                ... on Admin {
                  __typename
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
        accounts {
          id
          isActive
        }
      }
    `,
    {
      data: {
        accounts: [
          {
            id: "u1",
            isActive: false,
          },
          {
            id: "u2",
            isActive: false,
          },
          {
            id: "u3",
            isActive: false,
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            accounts {
              __typename
              id
            }
          }
        },
        Flatten(path: "accounts.@") {
          Fetch(service: "c") {
            {
              ... on Account {
                __typename
                id
              }
            } =>
            {
              ... on Account {
                isActive
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
        accounts {
          id
          ... on Admin {
            isActive
          }
        }
      }
    `,
    {
      data: {
        accounts: [
          {
            id: "u1",
            isActive: true,
          },
          {
            id: "u2",
            isActive: true,
          },
          {
            id: "u3",
          },
        ],
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            accounts {
              __typename
              id
            }
          }
        },
        Flatten(path: "accounts.@") {
          Fetch(service: "a") {
            {
              ... on Account {
                __typename
                id
              }
            } =>
            {
              ... on Account {
                __typename
                ... on Admin {
                  isActive
                }
              }
            }
          },
        },
      },
    }
    `
  ),
];
