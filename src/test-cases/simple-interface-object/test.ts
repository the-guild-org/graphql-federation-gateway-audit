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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
        ],
      },
    }
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
        ],
      },
    }
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
        ],
      },
    }
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
        ],
      },
    }
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
    }
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
    }
  ),
];
