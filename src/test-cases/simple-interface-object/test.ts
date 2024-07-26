import { createTest } from "../../testkit.js";

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
            # NOTE
            # id and username are available in the NodeWithName interfaceObject in subgraph B
            # but we still need to resolve the name field.
            anotherUsers {
              __typename
              id
              username
            }
          }
        },
        Flatten(path: "anotherUsers.@") {
          # NOTE
          # We call subgraph A to resolve an object type based on "id" field.
          # What's interesting here is that we trigger "__resolveReference" for NodeWithName
          # and that's an interface... weird but hey, it is what it is.
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
                name # here we go
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
      # NOTE
      # same story as in the test above 
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
        # NOTE
        # same story as in the test above 
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
      # NOTE
      # Query.users is only available in subgraph A
      # It can resolve only User objects, so we don't really have to do any extra calls
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
        # NOTE
        # Oh, Kamil, you said we don't need to do extra calls as in case of Query.users!!!
        # We do need to do extra calls here, but we do them only for the User objects,
        # the reason are additional fields like "age" and "name".
        #
        # Super interesting thing here is also the fact that we don't resolve the "username" field directly.
        # Not sure why is that... maybe to check if User exists? But that's not true in my opinion.
        # In other tests we resolve the "username" field directly.
        # I think the only difference is that it's a fragment and we resolve it only for User objects,
        # and since an @interfaceObject cannot tell the __typename, we need to confirm it first.
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
        # NOTE
        # Here's a proof to what I said before, that when there's a fragment involved,
        # and a field could be resolved directly from the interfaceObject,
        # we still need to resolve an object via entity call to get the __typename.
        # Without __typename (@interfaceObject returns __typename: "<name of the interface>" so we can't rely on it)
        # we don't know if "name" field should be resolved or not.
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
          # NOTE
          # __typename is not available in the interfaceObject, needs to be resolved indirectly
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
          # NOTE
          # id is available in the interfaceObject and can be resolved as there's no type condition involved
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
