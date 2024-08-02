import { serve } from "../../supergraph.js";
import node from "./node.subgraph.js";
import nodeTwo from "./node-two.js";
import types from "./types.subgraph.js";
import tests from "./test.js";

export default serve(
  "node",
  [node, nodeTwo, types],
  tests
);
