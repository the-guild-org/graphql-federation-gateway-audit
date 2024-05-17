import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        productFromD(id: "1") {
          id
          name
          category {
            id
            name
            details
          }
        }
      }
    `,
    {
      data: {
        productFromD: {
          id: "1",
          name: "Product#1",
          category: {
            id: "3",
            name: "Category#3",
            details: "Details for Product#1",
          },
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "d") {
          {
            # NOTE
            # Query.productFromD is only available in subgraph D.
            # We need to fetch Product.category { id name details }
            # Product.category is available in subgraphs A and B.
            # Subgraph A provides Product.category { details }
            # Subgraph B provides Product.category { id }
            # Subgraph C provides Category.name based on Category.id (entity call)
            productFromD(id: 1) {
              __typename
              id
              name
            }
          }
        },
        Parallel {
          Flatten(path: "productFromD") {
            Fetch(service: "a") {
              {
                ... on Product {
                  __typename
                  id
                }
              } =>
              {
                # NOTE
                # Product.category { details } is fetched from subgraph A using Product(id) call
                ... on Product {
                  category {
                    details
                  }
                }
              }
            },
          },
          Sequence {
            Flatten(path: "productFromD") {
              Fetch(service: "b") {
                {
                  ... on Product {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Product {
                    category {
                      __typename
                      id
                    }
                  }
                }
              },
            },
            Flatten(path: "productFromD.category") {
              Fetch(service: "c") {
                {
                  ... on Category {
                    __typename
                    id
                  }
                } =>
                {
                  # NOTE
                  # Product.category { name } is fetched from subgraph C using Category(id) call.
                  # Category.id was fetched from subgraph B using Product(id) { category { id } } call.
                  ... on Category {
                    name
                  }
                }
              },
            },
          },
        },
      },
    }
    `
  ),
];
