import { serve } from "../../supergraph";
import price from "./price.subgraph";
import product from "./product.subgraph";
import test from "./test";

export default serve("mysterious-external", [price, product], test);
