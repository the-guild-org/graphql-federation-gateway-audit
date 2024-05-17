import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name
          category
          price
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          name: "Product 1",
          price: 100,
          category: "Category 1",
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      # NOTE
      # What's interesting here is that the most efficient way to fetch the data
      # is to make parallel calls to Query.products in each service.
      # Each service has a different field that it can provide.
      Parallel {
        Fetch(service: "name") {
          {
            product {
              name
            }
          }
        },
        Fetch(service: "category") {
          {
            product {
              category
              id
            }
          }
        },
        Fetch(service: "price") {
          {
            product {
              price
            }
          }
        },
      },
    }
    `
  ),
];
