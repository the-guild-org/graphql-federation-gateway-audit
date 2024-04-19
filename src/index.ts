import { Hono } from "hono";
import { getBaseUrl } from "./utils";

const app = new Hono();

const testCases = await Promise.all([
  import("./test-cases/union-intersection"),
  import("./test-cases/simple-entity-call"),
  import("./test-cases/complex-entity-call"),
  import("./test-cases/mysterious-external"),
  import("./test-cases/simple-requires-provides"),
  import("./test-cases/override-type-interface"),
  import("./test-cases/simple-interface-object"),
  import("./test-cases/simple-override"),
  import("./test-cases/unavailable-override"),
  import("./test-cases/override-with-requires"),
]);

const ids = testCases.map((testCase) => testCase.default.id);

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
