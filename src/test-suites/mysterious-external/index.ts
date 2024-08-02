import { serve } from "../../supergraph.js";
import price from "./price.subgraph.js";
import product from "./product.subgraph.js";
import test from "./test.js";

export default serve("mysterious-external", [price, product], test);
