import { serve } from "../../supergraph";

export default serve(
  "simple-requires-provides",
  [
    import("./accounts.subgraph"),
    import("./inventory.subgraph"),
    import("./products.subgraph"),
    import("./reviews.subgraph"),
  ],
  import("./test")
);
