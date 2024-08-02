import { serve } from "../../supergraph.js";
import link from "./link.subgraph.js";
import list from "./list.subgraph.js";
import price from "./price.subgraph.js";
import products from "./products.subgraph.js";
import test from "./test.js";

export default serve(
  "complex-entity-call",
  [link, list, price, products],
  test,
);
