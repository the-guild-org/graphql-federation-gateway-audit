import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        a {
          city
        }
      }
    `,
    {
      data: {
        a: {
          city: "a1-city",
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
            }
          }
        },
        Flatten(path: "a") {
          Fetch(service: "b") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                address {
                  __typename
                  id
                }
              }
            }
          },
        },
        Flatten(path: "a") {
          Fetch(service: "a") {
            {
              ... on User {
                __typename
                address {
                  id
                }
                id
              }
            } =>
            {
              ... on User {
                city
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
          city
        }
      }
    `,
    {
      data: {
        b: {
          city: "a2-city",
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
              address {
                __typename
                id
              }
            }
          }
        },
        Flatten(path: "b") {
          Fetch(service: "a") {
            {
              ... on User {
                __typename
                id
                address {
                  id
                }
              }
            } =>
            {
              ... on User {
                city
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
          address {
            __typename
            id
          }
        }
      }
    `,
    {
      data: {
        a: {
          address: {
            __typename: "HomeAddress",
            id: "a1",
          },
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
            }
          }
        },
        Flatten(path: "a") {
          Fetch(service: "b") {
            {
              ... on User {
                __typename
                id
              }
            } =>
            {
              ... on User {
                address {
                  __typename
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
        b {
          address {
            __typename
            id
          }
        }
      }
    `,
    {
      data: {
        b: {
          address: {
            __typename: "WorkAddress",
            id: "a2",
          },
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Fetch(service: "b") {
        {
          b {
            address {
              __typename
              id
            }
          }
        }
      },
    }
    `
  ),
];
