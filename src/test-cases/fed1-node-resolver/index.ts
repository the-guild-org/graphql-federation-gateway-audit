import { serve } from "../../supergraph";
import node from "./node.subgraph";
import post from "./post.subgraph";
import user from "./user.subgraph";
import test from "./test";

export default serve("fed1-node-resolver", [node, post, user], test);
