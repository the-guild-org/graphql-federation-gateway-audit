import { createTest } from "../../testkit.js";

export default [
  createTest(
    /* GraphQL */ `
      {
        userInA {
          id
          name
          aName
          cName
        }
        userInB {
          id
          name
          aName
          cName
        }
        userInC {
          id
          name
          aName
          cName
        }
      }
    `,
    {
      data: {
        userInA: {
          id: "u1",
          name: "u1-name",
          aName: "a__u1-name",
          cName: "c__u1-name",
        },
        userInB: {
          id: "u2",
          name: "u2-name",
          aName: "a__u2-name",
          cName: "c__u2-name",
        },
        userInC: {
          id: "u3",
          name: "u3-name",
          aName: "a__u3-name",
          cName: "c__u3-name",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        userInC {
          cName
        }
      }
    `,
    {
      data: {
        userInC: {
          cName: "c__u3-name",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        userInA {
          cName
        }
      }
    `,
    {
      data: {
        userInA: {
          cName: "c__u1-name",
        },
      },
    },
  ),
  createTest(
    /* GraphQL */ `
      query {
        userInA {
          aName
        }
      }
    `,
    {
      data: {
        userInA: {
          aName: "a__u1-name",
        },
      },
    },
  ),
];
