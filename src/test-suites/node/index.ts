import { serve } from "../../supergraph.js";
import node from "./node.subgraph.js";
import nodeTwo from "./node-two.js";
import types from "./types.subgraph.js";
import { createTest } from "../../testkit.js";
// import test from "./test.js";

export default serve(
  "node",
  [node, nodeTwo, types],
  [
    createTest(
      /* GraphQL */ `
        {
          productNode {
            ... on Product {
              id
              name
              __typename
              price
            }
          }
        }
      `,
      {
        data: {
          productNode: {
            id: "p-1",
            name: "Product 1",
            __typename: "Product",
            price: 10,
          },
        },
      }
    ),
  ]
);
