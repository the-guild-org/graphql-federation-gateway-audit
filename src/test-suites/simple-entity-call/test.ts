import { createTest } from "../../testkit.js";
import { users } from "./data.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        user {
          id
          nickname
        }
      }
    `,
    {
      data: {
        user: {
          id: users[0].id,
          nickname: users[0].nickname,
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "email") {
          {
            user {
              __typename
              email
              id
            }
          }
        },
        Flatten(path: "user") {
          Fetch(service: "nickname") {
            {
              ... on User {
                __typename
                email
              }
            } =>
            {
              ... on User {
                nickname
              }
            }
          },
        },
      },
    }
    `
  ),
];
