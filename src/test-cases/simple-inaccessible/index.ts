import { serve } from "../../supergraph";
import friends from "./friends.subgraph";
import age from "./age.subgraph";
import test from "./test";

export default serve("simple-inaccessible", [friends, age], test);
