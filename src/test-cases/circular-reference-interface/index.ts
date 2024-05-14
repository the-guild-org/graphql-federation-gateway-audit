import { serve } from "../../supergraph";
import a from "./a.subgraph";
import b from "./b.subgraph";
import test from "./test";

export default serve("circular-reference-interface", [a, b], test);
