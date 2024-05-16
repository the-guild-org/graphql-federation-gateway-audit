import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        node(id: "a1") {
          id
        }
      }
    `,
    {
      // Query.node/a cannot resolve Chat.id, because it's @external
      // Query.node/b cannot resolve Account.id, because it's @external
      // Supergraph is composed of a and b, but it's simply impossible to resolve the query.
      errors: true,
      data: null,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        account: node(id: "a1") {
          __typename
        }
        chat: node(id: "c1") {
          __typename
        }
      }
    `,
    {
      data: {
        account: {
          __typename: "Account",
        },
        chat: {
          __typename: "Chat",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          account: node(id: "a1") {
            __typename
          }
          chat: node(id: "c1") {
            __typename
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        account: node(id: "a1") {
          ... on Account {
            id
            username
          }
        }
        chat: node(id: "c1") {
          ... on Chat {
            id
            text
          }
        }
      }
    `,
    {
      data: {
        account: {
          id: "a1",
          username: "a1-username",
        },
        chat: {
          id: "c1",
          text: "c1-text",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Fetch(service: "a") {
          {
            account: node(id: "a1") {
              __typename
              ... on Account {
                id
                username
              }
            }
          }
        },
        Fetch(service: "b") {
          {
            chat: node(id: "c1") {
              __typename
              ... on Chat {
                id
                text
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
      query {
        account: node(id: "a1") {
          ... on Chat {
            id
          }
        }
        chat: node(id: "c1") {
          ... on Account {
            id
          }
        }
      }
    `,
    {
      data: {
        account: {},
        chat: {},
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Fetch(service: "b") {
          {
            account: node(id: "a1") {
              __typename
              ... on Chat {
                id
              }
            }
          }
        },
        Fetch(service: "a") {
          {
            chat: node(id: "c1") {
              __typename
              ... on Account {
                id
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
      query {
        account: node(id: "a1") {
          __typename
          ... on Chat {
            id
          }
        }
        chat: node(id: "c1") {
          __typename
          ... on Account {
            id
          }
        }
      }
    `,
    {
      data: {
        account: {
          __typename: "Account",
        },
        chat: {
          __typename: "Chat",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Parallel {
        Fetch(service: "b") {
          {
            account: node(id: "a1") {
              __typename
              ... on Chat {
                id
              }
            }
          }
        },
        Fetch(service: "a") {
          {
            chat: node(id: "c1") {
              __typename
              ... on Account {
                id
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
      query {
        account: node(id: "a1") {
          id
          ... on Chat {
            id
          }
        }
        chat: node(id: "c1") {
          __typename
          ... on Account {
            id
          }
        }
      }
    `,
    {
      data: null,
      errors: true,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        chat(id: "c1") {
          id
        }
      }
    `,
    {
      data: {
        chat: {
          id: "c1",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          chat(id: "c1") {
            id
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        account(id: "a1") {
          id
        }
      }
    `,
    {
      data: {
        account: {
          id: "a1",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "a") {
        {
          account(id: "a1") {
            id
          }
        }
      },
    }
    `
  ),
  createTest(
    /* GraphQL */ `
      query {
        chat(id: "c1") {
          id
          text
          account {
            id
          }
        }
      }
    `,
    {
      data: {
        chat: {
          id: "c1",
          text: "c1-text",
          account: {
            id: "a1",
          },
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "b") {
          {
            chat(id: "c1") {
              __typename
              id
              text
            }
          }
        },
        Flatten(path: "chat") {
          Fetch(service: "a") {
            {
              ... on Chat {
                __typename
                id
              }
            } =>
            {
              ... on Chat {
                account {
                  id
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
        account(id: "a1") {
          id
          username
          chats {
            id
          }
        }
      }
    `,
    {
      data: {
        account: {
          id: "a1",
          username: "a1-username",
          chats: [
            {
              id: "c1",
            },
          ],
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            account(id: "a1") {
              __typename
              id
              username
            }
          }
        },
        Flatten(path: "account") {
          Fetch(service: "b") {
            {
              ... on Account {
                __typename
                id
              }
            } =>
            {
              ... on Account {
                chats {
                  id
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
