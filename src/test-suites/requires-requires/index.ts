import { serve } from "../../supergraph.js";
import a from "./a.subgraph.js";
import b from "./b.subgraph.js";
import c from "./c.subgraph.js";
import d from "./d.subgraph.js";
import test from "./test.js";

export default serve("requires-requires", [a, b, c, d], test);
