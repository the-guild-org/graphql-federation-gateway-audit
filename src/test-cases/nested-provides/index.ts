import { serve } from "../../supergraph.js";
import allProducts from "./all-products.subgraph.js";
import category from "./category.subgraph.js";
import subcategories from "./subcategories.subgraph.js";
import test from "./test.js";

// Besides checking if @provides with nested fields works,
// this test also checks if a gateway can resolve fields through a field with @provides
// to avoid making entity calls.
export default serve(
  "nested-provides",
  [allProducts, category, subcategories],
  test
);
