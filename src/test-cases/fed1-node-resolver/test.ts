import { createTest } from "../../test";

export default [
    createTest(
    /* GraphQL */ `
      query {
        node(id: "1") {
            __typename
            id
            ... on User {
                name
            }
        }
      }
    `,
        {
            data: {
                node: {
                    __typename: 'User',
                    id: "1",
                    name: 'Alice',
                },
            },
        }
    ),
];