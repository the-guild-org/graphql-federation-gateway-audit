import { createTest } from "../../test";

export default [
  createTest(
    /* GraphQL */ `
      query {
        b {
          id
          data {
            __typename
          }
        }
        bb {
          id
          data {
            __typename
          }
        }
      }
    `,
    {
      data: {
        b: {
          id: "e1",
          data: null,
        },
        bb: {
          id: "e2",
          data: {
            __typename: "Qux",
          },
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          requirer
        }
      }
    `,
    {
      data: {
        a: {
          requirer: "q1-foo_requirer",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        a {
          data {
            __typename
          }
          requirer
        }
      }
    `,
    {
      data: {
        a: {
          data: {
            __typename: "Qux",
          },
          requirer: "q1-foo_requirer",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        bb {
          data {
            __typename
          }
          requirer
        }
      }
    `,
    {
      data: {
        bb: {
          data: {
            __typename: "Qux",
          },
          requirer: "q1-foo_requirer",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        b {
          data {
            __typename
          }
          requirer
        }
      }
    `,
    {
      data: {
        b: {
          data: null,
          requirer: "b1-foo_requirer",
        },
      },
    }
  ),
  createTest(
    /* GraphQL */ `
      query {
        bb {
          data {
            __typename
          }
          requirer2
        }
      }
    `,
    {
      data: {
        bb: {
          data: {
            __typename: "Qux",
          },
          requirer2: "q1-foo_requirer2",
        },
      },
    }
  ),
];
