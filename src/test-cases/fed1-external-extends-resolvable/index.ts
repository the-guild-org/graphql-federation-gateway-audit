import { serve } from "../../supergraph";
import a from "./a.subgraph";
import b from "./b.subgraph";
import tests from "./test";

export default serve("fed1-external-extends-resolvable", [a, b], tests);
