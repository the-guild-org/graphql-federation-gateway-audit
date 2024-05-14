import { serve } from "../../supergraph";
import a from "./a.subgraph";
import b from "./b.subgraph";
import c from "./c.subgraph";
import test from "./test";

export default serve("provides-on-interface", [a, b, c], test);
