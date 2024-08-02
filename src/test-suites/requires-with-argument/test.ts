import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      query {
        products {
          upc
          name
          shippingEstimate
        }
      }
    `,
    {
      data: {
        products: [
          {
            upc: "p1",
            name: "p-name-1",
            shippingEstimate: 110,
          },
          {
            upc: "p2",
            name: "p-name-2",
            shippingEstimate: 440,
          },
        ],
      },
    }
  ),
];
