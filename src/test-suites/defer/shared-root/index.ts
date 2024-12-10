import { serve } from "../../../supergraph.js";
import name from "./name.subgraph.js";
import price from "./price.subgraph.js";
import category from "./category.subgraph.js";
import test from "./test.js";

export default serve("defer-shared-root", [name, price, category], test);

/*

@defer
Subscriptions
@authenticated
@requiresScopes
@policy
*/
