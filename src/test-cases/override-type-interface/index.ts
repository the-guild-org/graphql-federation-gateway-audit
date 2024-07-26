import { serve } from "../../supergraph.js";
import a from "./a.subgraph.js";
import b from "./b.subgraph.js";
import test from "./test.js";

export default serve("override-type-interface", [a, b], test);
