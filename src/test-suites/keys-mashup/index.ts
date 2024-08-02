import { serve } from "../../supergraph";
import a from "./a.subgraph.js";
import b from "./b.subgraph.js";
import test from "./test.js";

export default serve("keys-mashup", [a, b], test);
