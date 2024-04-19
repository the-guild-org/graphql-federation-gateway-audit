import { serve } from "../../supergraph";

export default serve(
  "override-type-interface",
  [import("./a.subgraph"), import("./b.subgraph")],
  import("./test")
);
