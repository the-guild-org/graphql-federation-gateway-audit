import { serve } from "../supergraph";

export default serve(
  "complex-entity-call",
  [
    import("./link.subgraph"),
    import("./list.subgraph"),
    import("./price.subgraph"),
    import("./products.subgraph"),
  ],
  import("./test")
);
