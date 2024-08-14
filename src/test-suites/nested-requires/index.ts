import { serve } from "../../supergraph.js";
import service1Subgraph from "./service1.subgraph.js";
import service2Subgraph from "./service2.subgraph.js";
import service3Subgraph from "./service3.subgraph.js";
import test from "./test.js";

export default serve(
  "nested-requires",
  [service1Subgraph, service2Subgraph, service3Subgraph],
  test
);
