import { serve } from "../../supergraph";

export default serve(
  "union-intersection",
  [import("./a.subgraph"), import("./b.subgraph")],
  import("./test")
);
