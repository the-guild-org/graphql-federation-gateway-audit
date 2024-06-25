import { serve } from "../../supergraph";
import a from "./a.subgraph";
import b from "./b.subgraph";
import test from "./test";

export default serve("child-type-mismatch", [a, b], test);
