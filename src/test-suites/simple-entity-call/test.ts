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
  ),
];
