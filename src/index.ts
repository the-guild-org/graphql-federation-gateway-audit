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
import childTypeMismatch from "./test-cases/child-type-mismatch";
import nonResolvableInterfaceObject from "./test-cases/non-resolvable-interface-object";
import interfaceObjectWithRequires from "./test-cases/interface-object-with-requires";
import requiresInterface from "./test-cases/requires-interface";
import fed1ExternalExtends from "./test-cases/fed1-external-extends";
import fed2ExternalExtends from "./test-cases/fed2-external-extends";
import fed1ExternalExtension from "./test-cases/fed1-external-extension";
import fed2ExternalExtension from "./test-cases/fed2-external-extension";
import parentEntityCall from "./test-cases/parent-entity-call";
import corruptedSupergraphNodeId from "./test-cases/corrupted-supergraph-node-id";
import parentEntityCallComplex from "./test-cases/parent-entity-call-complex";
import sharedRoot from "./test-cases/shared-root";
import nestedProvides from "./test-cases/nested-provides";
import providesOnInterface from "./test-cases/provides-on-interface";
import providesOnUnion from "./test-cases/provides-on-union";
import requiresRequires from "./test-cases/requires-requires";
import includeSkip from "./test-cases/include-skip";
import circularReferenceInterface from "./test-cases/circular-reference-interface";
import typename from "./test-cases/typename";
import unionInterfaceDistributed from "./test-cases/union-interface-distributed";
import mutations from "./test-cases/mutations";
import abstractTypes from "./test-cases/abstract-types";
import fed1ExternalExtendsResolvable from "./test-cases/fed1-external-extends-resolvable";
import { Env } from "./env";

const testCases = [
  mutations,
  abstractTypes,
  corruptedSupergraphNodeId,
  unionIntersectionTestCase,
  simpleEntityCallTestCase,
  complexEntityCallTestCase,
  mysteriousExternalTestCase,
  simpleRequiresProvidesTestCase,
  nestedProvides,
  providesOnInterface,
  providesOnUnion,
  overrideTypeInterfaceTestCase,
  simpleInterfaceObjectTestCase,
  simpleOverrideTestCae,
  unavailableOverrideTestCase,
  simpleInaccessible,
  enumIntersection,
  unionInterfaceDistributed,
  inputObjectIntersection,
  requiresWithFragments,
  requiresInterface,
  interfaceObjectWithRequires,
  overrideWithRequiresTestCase,
  requiresRequires,
  childTypeMismatch,
  nonResolvableInterfaceObject,
  fed1ExternalExtends,
  fed2ExternalExtends,
  fed1ExternalExtension,
  fed2ExternalExtension,
  fed1ExternalExtendsResolvable,
  parentEntityCall,
  parentEntityCallComplex,
  sharedRoot,
  includeSkip,
  circularReferenceInterface,
  typename,
];

function routerFetch(
  request: Request,
  env: {
    IS_DEV_MODE?: string;
  } & Env
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
    testCase.createRoutes(router, isDevMode, env);
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

export { MutationsTestStorage } from "./test-cases/mutations/data";
