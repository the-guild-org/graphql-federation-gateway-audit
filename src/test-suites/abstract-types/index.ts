import { serve } from "../../supergraph.js";
import inventorySubgraph from "./inventory.subgraph.js";
import booksSubgraph from "./books.subgraph.js";
import usersSubgraph from "./users.subgraph.js";
import productsSubgraph from "./products.subgraph.js";
import reviewsSubgraph from "./reviews.subgraph.js";
import magazinesSubgraph from "./magazines.subgraph.js";
import agencySubgraph from "./agency.subgraph.js";
import test from "./test.js";

export default serve(
  "abstract-types",
  [
    agencySubgraph,
    inventorySubgraph,
    booksSubgraph,
    usersSubgraph,
    reviewsSubgraph,
    productsSubgraph,
    magazinesSubgraph,
  ],
  test,
);
