import { serve } from "../supergraph";

export default serve(
  "simple-override",
  [import("./a.subgraph"), import("./b.subgraph")],
  import("./test")
);
