import { createRouter, Response } from "fets";
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

const router = createRouter({
  landingPage: false,
});

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
].map((testCase) => testCase(router));

router.route({
  method: "GET",
  path: "/",
  handler() {
    return Response.json(ids);
  },
});

router.route({
  method: "GET",
  path: "/supergraphs",
  handler(req) {
    return Response.json(
      ids.map((id) => `${req.parsedUrl.origin}/${id}/supergraph`)
    );
  },
});

router.route({
  method: "GET",
  path: "/tests",
  handler(req) {
    return Response.json(
      ids.map((id) => `${req.parsedUrl.origin}/${id}/tests`)
    );
  },
});

export default {
  fetch: router.fetch,
};
