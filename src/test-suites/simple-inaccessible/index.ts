import { serve } from "../../supergraph.js";
import friends from "./friends.subgraph.js";
import age from "./age.subgraph.js";
import test from "./test.js";

export default serve("simple-inaccessible", [friends, age], test);
