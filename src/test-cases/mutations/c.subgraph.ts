import { Env } from "../../env";
import { createSubgraph } from "../../subgraph";
import { addNumber, deleteNumber } from "./data";

export default createSubgraph("c", {
  typeDefs: /* GraphQL */ `
    extend schema
      @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

    type Mutation {
      add(num: Int!, requestId: String!): Int!
      delete(requestId: String!): Int!
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
        ctx: { env: Env }
      ) {
        return addNumber(ctx.env, args.num, args.requestId);
      },
      delete(
        _: {},
        args: {
          requestId: string;
        },
        ctx: { env: Env }
      ) {
        return deleteNumber(ctx.env, args.requestId);
      },
    },
  },
});
