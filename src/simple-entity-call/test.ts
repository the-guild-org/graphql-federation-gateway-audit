import { createTest } from "../test";
import { users } from "./data";

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
    }
  ),
];
