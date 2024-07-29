import { serve } from "../../supergraph.js";
import a from "./a.subgraph.js";
import b from "./b.subgraph.js";
import c from "./c.subgraph.js";
import test from "./test.js";

export default serve("parent-entity-call", [a, b, c], test);
