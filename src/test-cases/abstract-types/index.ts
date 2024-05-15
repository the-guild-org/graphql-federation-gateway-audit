import { serve } from "../../supergraph";
import inventorySubgraph from "./inventory.subgraph";
import booksSubgraph from "./books.subgraph";
import usersSubgraph from "./users.subgraph";
import productsSubgraph from "./products.subgraph";
import reviewsSubgraph from "./reviews.subgraph";
import magazinesSubgraph from "./magazines.subgraph";
import agencySubgraph from "./agency.subgraph";

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
  []
);
