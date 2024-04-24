import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        randomUser {
          id
          name
        }
        userById(id: "u2") {
          id
          name
          nickname
        }
      }
    `,
    {
      data: {
        randomUser: {
          id: "u1",
          name: "u1-name",
        },
        userById: {
          id: "u2",
          name: "u2-name",
          nickname: "u2-nickname",
        },
      },
    }
  ),
];
