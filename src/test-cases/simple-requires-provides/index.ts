import { serve } from "../../supergraph";
import accounts from "./accounts.subgraph";
import inventory from "./inventory.subgraph";
import products from "./products.subgraph";
import reviews from "./reviews.subgraph";
import test from "./test";

export default serve(
  "simple-requires-provides",
  [accounts, inventory, products, reviews],
  test
);
