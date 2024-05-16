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
        Flatten(path: "anotherUsers.@") {
          Fetch(service: "b") {
            {
              ... on NodeWithName {
                __typename
                name
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
                name
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
                id
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
              ... on NodeWithName {
                __typename
                name
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
              ... on NodeWithName {
                __typename
                name
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
              ... on NodeWithName {
                __typename
                name
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
];
