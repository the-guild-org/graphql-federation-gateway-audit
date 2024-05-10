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
import simpleInaccessible from "./test-cases/simple-inaccessible";
import enumIntersection from "./test-cases/enum-intersection";
import inputObjectIntersection from "./test-cases/input-object-intersection";
import requiresWithFragments from "./test-cases/requires-with-fragments";
import entityAndNoEntity from "./test-cases/entity-and-no-entity";
import nonResolvableInterfaceObject from "./test-cases/non-resolvable-interface-object";
import interfaceObjectWithRequires from "./test-cases/interface-object-with-requires";
import requiresInterface from "./test-cases/requires-interface";
import fed1ExternalExtends from "./test-cases/fed1-external-extends";
import parentEntityCall from "./test-cases/parent-entity-call";
import corruptedSupergraphNodeId from "./test-cases/corrupted-supergraph-node-id";
import parentEntityCallComplex from "./test-cases/parent-entity-call-complex";

const testCases = [
  corruptedSupergraphNodeId,
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
  simpleInaccessible,
  enumIntersection,
  inputObjectIntersection,
  requiresWithFragments,
  entityAndNoEntity,
  nonResolvableInterfaceObject,
  interfaceObjectWithRequires,
  requiresInterface,
  fed1ExternalExtends,
  parentEntityCall,
  parentEntityCallComplex,
];

function routerFetch(
  request: Request,
  env: {
    IS_DEV_MODE?: string;
  }
) {
  const isDevMode = env.IS_DEV_MODE === "true";

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

  router.route({
    method: "GET",
    path: "/subgraphs",
    description: "A list of endpoints with subgraphs",
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
        testCases.map(({ id }) => `${req.parsedUrl.origin}/${id}/subgraphs`)
      );
    },
  });

  testCases.sort((a, b) => a.id.localeCompare(b.id));

  let registeredNames = new Set<string>();

  for (const testCase of testCases) {
    if (registeredNames.has(testCase.id)) {
      throw new Error(`Duplicate test case id: ${testCase.id}`);
    }

    registeredNames.add(testCase.id);
    testCase.createRoutes(router, isDevMode);
  }

  router.route({
    path: "*",
    handler: () => new Response("Not found", { status: 404 }),
  });

  return router.fetch(request, {});
}

export default {
  fetch: routerFetch,
};
