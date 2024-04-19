import { serve } from "../../supergraph";

export default serve(
  "mysterious-external",
  [import("./price.subgraph"), import("./product.subgraph")],
  import("./test")
);
