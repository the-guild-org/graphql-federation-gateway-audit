import { createTest } from "../../testkit.js";

export default [
    createTest(
    /* GraphQL */ `
      query {
        bookContainers {
            book {
                upc
                author {
                    name
                }
            }
        }
      }
    `,
        {
            data: {
                bookContainers: [
                    {
                        book: {
                            upc: "b1",
                            author: {
                                name: "Alice"
                            }
                        }
                    },
                    {
                        book: {
                            upc: "b2",
                            author: {
                                name: "Bob"
                            }
                        }
                    },
                    {
                        book: {
                            upc: "b3",
                            author: null,
                        }
                    }
                ]
            },
        },
    ),
];
