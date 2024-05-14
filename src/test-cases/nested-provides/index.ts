import { serve } from "../../supergraph";
import allProducts from "./all-products.subgraph";
import category from "./category.subgraph";
import subcategories from "./subcategories.subgraph";
import test from "./test";

// Besides checking if @provides with nested fields works,
// this test also checks if a gateway can resolve fields through a field with @provides
// to avoid making entity calls.
export default serve(
  "nested-provides",
  [allProducts, category, subcategories],
  test
);
