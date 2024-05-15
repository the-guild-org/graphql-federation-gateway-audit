import { serve } from "../../supergraph";
import inventorySubgraph from "./inventory.subgraph";
import booksSubgraph from "./books.subgraph";
import usersSubgraph from "./users.subgraph";
import productsSubgraph from "./products.subgraph";
import reviewsSubgraph from "./reviews.subgraph";
import magazinesSubgraph from "./magazines.subgraph";

export default serve(
  "abstract-types",
  [
    inventorySubgraph,
    booksSubgraph,
    usersSubgraph,
    reviewsSubgraph,
    productsSubgraph,
    magazinesSubgraph,
  ],
  []
);
