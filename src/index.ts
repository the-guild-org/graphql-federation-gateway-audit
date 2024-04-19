import { Hono } from "hono";
import { getBaseUrl } from "./utils";
import unionIntersectionTestCase from "./test-cases/union-intersection";
import simpleEntityCallTestCase from "./test-cases/simple-entity-call";
import complexEntityCallTestCase from "./test-cases/complex-entity-call";
import mysteriousExternalTestCase from "./test-cases/mysterious-external";
import simpleRequiresProvidesTestCase from "./test-cases/simple-requires-provides";
import overrideTypeInterfaceTestCase from "./test-cases/override-type-interface";
import simpleInterfaceObjectTestCase from "./test-cases/simple-interface-object";
import simpleOverrideTestCae from "./test-cases/simple-override";
import unavailableOverrideTestCase from "./test-cases/unavailable-override";
import overrideWithRequiresTestCase from "./test-cases/override-with-requires";

const app = new Hono();

const ids = [
  unionIntersectionTestCase,
  simpleEntityCallTestCase,
  complexEntityCallTestCase,
  mysteriousExternalTestCase,
  simpleRequiresProvidesTestCase,
  overrideTypeInterfaceTestCase,
  simpleInterfaceObjectTestCase,
  simpleOverrideTestCae,
  unavailableOverrideTestCase,
  overrideWithRequiresTestCase,
].map((testCase) => testCase(app));
app.get("/", (c) => c.json(ids));

app.get("/supergraphs", (c) => {
  const baseUrl = getBaseUrl(c.req);
  return c.json(ids.map((id) => `${baseUrl}/${id}/supergraph`));
});

app.get("/tests", (c) => {
  const baseUrl = getBaseUrl(c.req);
  return c.json(ids.map((id) => `${baseUrl}/${id}/tests`));
});

export default app;
