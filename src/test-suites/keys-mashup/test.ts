import { createTest } from "../../testkit";

export default [
  createTest(
    /* GraphQL */ `
      query {
        b {
          id
          a {
            id
            name
            nameInB
          }
        }
      }
    `,
    {
      data: {
        b: {
          id: "100",
          a: [
            {
              id: "1",
              name: "a.1",
              nameInB: "b.a.nameInB a.1",
            },
          ],
        },
      },
    },
  ),
];
