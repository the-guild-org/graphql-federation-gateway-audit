import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        b {
          id
          favouriteTypeAs {
            id
            name
            nameInTypeB
          }
        }
      }
    `,
    {
      data: {
        b: {
          id: "100",
          favouriteTypeAs: [
            {
              id: "1",
              name: "a.1",
              nameInTypeB: "b.TypeA.nameInTypeB a.1",
            },
          ],
        },
      },
    }
  ),
];
