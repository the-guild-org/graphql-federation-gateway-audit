import { Hono } from "hono";
import unionIntersection from "./union-intersection";
import simpleEntityCall from "./simple-entity-call";
import complexEntityCall from "./complex-entity-call";
import mysteriousExternal from "./mysterious-external";
import simpleRequiresProvides from "./simple-requires-provides";
import overrideTypeInterface from "./override-type-interface";
import simpleInterfaceObject from "./simple-interface-object";
import simpleOverride from "./simple-override";
import unavailableOverride from "./unavailable-override";

const app = new Hono();

const supergraphs = await Promise.all(
  [
    unionIntersection,
    simpleEntityCall,
    complexEntityCall,
    mysteriousExternal,
    simpleRequiresProvides,
    overrideTypeInterface,
    simpleInterfaceObject,
    simpleOverride,
    unavailableOverride,
  ].map((serve) => serve(app))
);

app.get("/", (c) => {
  const baseUrl = new URL(c.req.url).origin;
  return c.text(
    supergraphs.map((id) => `${baseUrl}/${id}/supergraph`).join("\n")
  );
});

app.get("/tests", (c) => {
  const baseUrl = new URL(c.req.url).origin;
  return c.text(supergraphs.map((id) => `${baseUrl}/${id}/tests`).join("\n"));
});

export default app;
