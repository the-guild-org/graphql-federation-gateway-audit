import { serve } from "../supergraph";

export default serve(
  "override-with-requires",
  [import("./a.subgraph"), import("./b.subgraph"), import("./c.subgraph")],
  import("./test")
);
