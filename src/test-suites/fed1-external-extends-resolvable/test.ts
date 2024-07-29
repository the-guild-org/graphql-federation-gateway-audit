import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        productInA {
          id
          pid
          price
          upc
          name
        }
      }
    `,
    {
      data: {
        productInA: {
          id: "p1",
          pid: "p1-pid",
          price: 12.3,
          upc: "upc1",
          name: "p1-name",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "a") {
          {
            productInA {
              __typename
              id
              name
              pid
            }
          }
        },
        Flatten(path: "productInA") {
          Fetch(service: "b") {
            {
              ... on Product {
                __typename
                # NOTE
                # The "id" and "name" fields are available in subgraph A
                # and are needed to resolve the reference in subgraph B.
                # What we check here is if the gateway can resolve "upc".
                # It is marked as external, and it is part of the key fields,
                # but other set of key fields was used.
                # It means that you only need to fulfil one set of key fields,
                # to resolve every field in the type.
                id
                name
              }
            } =>
            {
              ... on Product {
                price
                upc
              }
            }
          },
        },
      },
    }
    `
  ),
];
