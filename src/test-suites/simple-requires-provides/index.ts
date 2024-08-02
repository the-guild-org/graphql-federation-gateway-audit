import { serve } from "../../supergraph.js";
import accounts from "./accounts.subgraph.js";
import inventory from "./inventory.subgraph.js";
import products from "./products.subgraph.js";
import reviews from "./reviews.subgraph.js";
import test from "./test.js";

export default serve(
  "simple-requires-provides",
  [accounts, inventory, products, reviews],
  test
);
