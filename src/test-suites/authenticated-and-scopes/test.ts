import { createTest } from "../../testkit.js";
import { createJWT } from "../../jwt.js";

export default [
  // Everything with granular scopes
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name {
            id
            brand
            model
          }
          category {
            id
            name
          }
          price {
            id
            amount
            currency
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          name: {
            id: "1",
            brand: "Brand 1",
            model: "Model 1",
          },
          price: {
            id: "1",
            amount: 1000,
            currency: "USD",
          },
          category: {
            id: "1",
            name: "Category 1",
          },
        },
      },
    },
    {
      // register JWT in JWKS
      Authorization: `Bearer ${createJWT(["category-name", "category-id", "price"])}`,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          name {
            id
            brand
            model
          }
          category {
            id
            name
          }
          price {
            id
            amount
            currency
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "1",
            name: {
              id: "1",
              brand: "Brand 1",
              model: "Model 1",
            },
            price: {
              id: "1",
              amount: 1000,
              currency: "USD",
            },
            category: {
              id: "1",
              name: "Category 1",
            },
          },
        ],
      },
    },
    {
      Authorization: `Bearer ${createJWT(["category-name", "category-id", "price"])}`,
    }
  ),
  // Everything with a single "all" scope
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name {
            id
            brand
            model
          }
          category {
            id
            name
          }
          price {
            id
            amount
            currency
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          name: {
            id: "1",
            brand: "Brand 1",
            model: "Model 1",
          },
          price: {
            id: "1",
            amount: 1000,
            currency: "USD",
          },
          category: {
            id: "1",
            name: "Category 1",
          },
        },
      },
    },
    {
      Authorization: `Bearer ${createJWT(["all"])}`,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          name {
            id
            brand
            model
          }
          category {
            id
            name
          }
          price {
            id
            amount
            currency
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "1",
            name: {
              id: "1",
              brand: "Brand 1",
              model: "Model 1",
            },
            price: {
              id: "1",
              amount: 1000,
              currency: "USD",
            },
            category: {
              id: "1",
              name: "Category 1",
            },
          },
        ],
      },
    },
    {
      Authorization: `Bearer ${createJWT(["all"])}`,
    }
  ),
  // Access only to the product's name
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name {
            id
            brand
            model
          }
          category {
            name
          }
          price {
            amount
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          name: {
            id: "1",
            brand: "Brand 1",
            model: "Model 1",
          },
          category: null,
          price: null,
        },
      },
      errors: true,
    },
    {
      Authorization: `Bearer ${createJWT(["non-used-scope"])}`,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          name {
            id
            brand
            model
          }
          category {
            name
          }
          price {
            amount
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "1",
            name: {
              id: "1",
              brand: "Brand 1",
              model: "Model 1",
            },
            category: null,
            price: null,
          },
        ],
      },
      errors: true,
    },
    {
      Authorization: `Bearer ${createJWT(["non-used-scope"])}`,
    }
  ),
  // No access, only to the product's id
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          name {
            brand
          }
          category {
            name
          }
          price {
            amount
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          name: null,
          category: null,
          price: null,
        },
      },
      errors: true,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          name {
            brand
          }
          category {
            name
          }
          price {
            amount
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "1",
            name: null,
            category: null,
            price: null,
          },
        ],
      },
      errors: true,
    }
  ),
  // Incomplete access to category
  createTest(
    /* GraphQL */ `
      query {
        product {
          id
          category {
            id
            name
          }
        }
      }
    `,
    {
      data: {
        product: {
          id: "1",
          category: null,
        },
      },
      errors: true,
    },
    {
      Authorization: `Bearer ${createJWT(["category-id"])}`,
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        products {
          id
          category {
            id
            name
          }
        }
      }
    `,
    {
      data: {
        products: [
          {
            id: "1",
            category: null,
          },
        ],
      },
      errors: true,
    },
    {
      Authorization: `Bearer ${createJWT(["category-id"])}`,
    }
  ),
];
