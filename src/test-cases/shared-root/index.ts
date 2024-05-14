import { serve } from "../../supergraph";
import name from "./name.subgraph";
import price from "./price.subgraph";
import category from "./category.subgraph";
import test from "./test";

// Shared root field that could be used to resolve fields directly, without doing entity calls
export default serve("shared-root", [name, price, category], test);
