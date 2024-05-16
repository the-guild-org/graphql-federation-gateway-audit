import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        topProducts {
          products {
            id
            pid
            price {
              price
            }
            category {
              mainProduct {
                id
              }
              id
              tag
            }
          }
          selected {
            id
          }
          first {
            id
          }
        }
      }
    `,
    {
      data: {
        topProducts: {
          products: [
            {
              id: "1",
              pid: "p1",
              price: {
                price: 100,
              },
              category: {
                mainProduct: {
                  id: "1",
                },
                id: "c1",
                tag: "t1",
              },
            },
            {
              id: "2",
              pid: "p2",
              price: {
                price: 200,
              },
              category: {
                mainProduct: {
                  id: "2",
                },
                id: "c2",
                tag: "t2",
              },
            },
          ],
          selected: {
            id: "2",
          },
          first: {
            id: "1",
          },
        },
      },
    },
    /* GraphQL */ `
    QueryPlan {
      Sequence {
        Fetch(service: "products") {
          {
            topProducts {
              __typename
              products {
                __typename
                id
                category {
                  mainProduct {
                    id
                  }
                  id
                  tag
                }
              }
            }
          }
        },
        Flatten(path: "topProducts.products.@") {
          Fetch(service: "link") {
            {
              ... on Product {
                __typename
                id
              }
            } =>
            {
              ... on Product {
                pid
              }
            }
          },
        },
        Parallel {
          Flatten(path: "topProducts.products.@") {
            Fetch(service: "price") {
              {
                ... on Product {
                  __typename
                  id
                  pid
                  category {
                    id
                    tag
                  }
                }
              } =>
              {
                ... on Product {
                  price {
                    price
                  }
                }
              }
            },
          },
          Flatten(path: "topProducts") {
            Fetch(service: "list") {
              {
                ... on ProductList {
                  __typename
                  products {
                    id
                    pid
                  }
                }
              } =>
              {
                ... on ProductList {
                  selected {
                    id
                  }
                  first {
                    id
                  }
                }
              }
            },
          },
        },
      },
    }
    `
  ),
];
