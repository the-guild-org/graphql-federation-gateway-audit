import { createSubgraph } from "../../subgraph.js";
import { addNumber } from "./data.js";

export default createSubgraph("c", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Mutation {
      add(num: Int!, requestId: String!): Int!
    }
  `,
  resolvers: {
    Mutation: {
      add(
        _: {},
        args: {
          num: number;
          requestId: string;
        },
      ) {
        return addNumber(args.num, args.requestId);
      },
    },
  },
});
