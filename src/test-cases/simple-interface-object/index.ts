import { serve } from "../../supergraph";

export default serve(
  "simple-interface-object",
  [import("./a.subgraph"), import("./b.subgraph")],
  import("./test")
);
