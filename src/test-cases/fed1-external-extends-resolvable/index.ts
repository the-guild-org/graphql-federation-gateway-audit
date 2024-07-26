import { serve } from "../../supergraph.js";
import a from "./a.subgraph.js";
import b from "./b.subgraph.js";
import tests from "./test.js";

export default serve("fed1-external-extends-resolvable", [a, b], tests);
