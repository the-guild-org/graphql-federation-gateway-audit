import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query SampleQuery($id: ID! = "foobar1") {
        node(id: $id) {
          __typename
          id
          ... on Foobar {
            uuid
          }
        }
      }
    `,
    {
      data: {
        node: {
            __typename: "Foobar",
            id: "foobar1",
            uuid: "uuid-foobar1",
        }
      },
    }
  ),
];
