import { serve } from "../../supergraph";
import link from "./link.subgraph";
import list from "./list.subgraph";
import price from "./price.subgraph";
import products from "./products.subgraph";
import test from "./test";

export default serve(
  "complex-entity-call",
  [link, list, price, products],
  test
);
