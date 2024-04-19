import { serve } from "../../supergraph";
import email from "./email.subgraph";
import nickname from "./nickname.subgraph";
import test from "./test";

export default serve("simple-entity-call", [email, nickname], test);
