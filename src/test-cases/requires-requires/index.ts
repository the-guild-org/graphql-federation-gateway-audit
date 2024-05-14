import { serve } from "../../supergraph";
import a from "./a.subgraph";
import b from "./b.subgraph";
import c from "./c.subgraph";
import d from "./d.subgraph";
import test from "./test";

export default serve("requires-requires", [a, b, c, d], test);
