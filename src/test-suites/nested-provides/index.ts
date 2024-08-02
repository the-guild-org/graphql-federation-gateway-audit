import { serve } from "../../supergraph.js";
import allProducts from "./all-products.subgraph.js";
import category from "./category.subgraph.js";
import subcategories from "./subcategories.subgraph.js";
import test from "./test.js";

export default serve(
  "nested-provides",
  [allProducts, category, subcategories],
  test,
);
