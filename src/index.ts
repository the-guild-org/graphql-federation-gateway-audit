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

const testCases = [
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
];

const router = createRouter({
  landingPage: false,
  swaggerUI: {
    endpoint: "/",
    displayOperationId: false,
  },
  openAPI: {
    info: {
      title: "Federation Compatibility Test Suite",
      description:
        "A test suite for validating Apollo Federation v2 compatibility",
      contact: {
        name: "The Guild",
        url: "https://the-guild.dev",
        email: "contact@the-guild.dev",
      },
    },
  },
});

router.route({
  method: "GET",
  path: "/_health",
  handler() {
    return new Response("OK");
  },
});

router.route({
  method: "GET",
  path: "/ids",
  operationId: "get_ids",
  description: "A list of test cases",
  tags: ["root"],
  schemas: {
    responses: {
      200: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  handler() {
    return Response.json(testCases.map((t) => t.id));
  },
});

router.route({
  method: "GET",
  path: "/supergraphs",
  description: "A list of supergraph endpoints",
  tags: ["root"],
  schemas: {
    responses: {
      200: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  handler(req) {
    return Response.json(
      testCases.map(({ id }) => `${req.parsedUrl.origin}/${id}/supergraph`)
    );
  },
});

router.route({
  method: "GET",
  path: "/tests",
  description: "A list of endpoints with tests",
  tags: ["root"],
  schemas: {
    responses: {
      200: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  handler(req) {
    return Response.json(
      testCases.map(({ id }) => `${req.parsedUrl.origin}/${id}/tests`)
    );
  },
});

testCases.sort((a, b) => a.id.localeCompare(b.id));

for (const testCase of testCases) {
  testCase.createRoutes(router);
}

export default {
  fetch: router.fetch,
};
