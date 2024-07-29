import { serve } from "../../supergraph.js";
import email from "./email.subgraph.js";
import nickname from "./nickname.subgraph.js";
import test from "./test.js";

export default serve("simple-entity-call", [email, nickname], test);
