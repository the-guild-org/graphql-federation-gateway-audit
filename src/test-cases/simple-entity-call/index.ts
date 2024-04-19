import { serve } from "../../supergraph";

export default serve(
  "simple-entity-call",
  [import("./email.subgraph"), import("./nickname.subgraph")],
  import("./test")
);
