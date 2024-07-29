import { createServer } from "node:http";
import { createRouter, Response } from "fets";
import unionIntersectionTestCase from "./test-suites/union-intersection/index.js";
import simpleEntityCallTestCase from "./test-suites/simple-entity-call/index.js";
import complexEntityCallTestCase from "./test-suites/complex-entity-call/index.js";
import mysteriousExternalTestCase from "./test-suites/mysterious-external/index.js";
import simpleRequiresProvidesTestCase from "./test-suites/simple-requires-provides/index.js";
import overrideTypeInterfaceTestCase from "./test-suites/override-type-interface/index.js";
import simpleInterfaceObjectTestCase from "./test-suites/simple-interface-object/index.js";
import simpleOverrideTestCae from "./test-suites/simple-override/index.js";
import unavailableOverrideTestCase from "./test-suites/unavailable-override/index.js";
import overrideWithRequiresTestCase from "./test-suites/override-with-requires/index.js";
import simpleInaccessible from "./test-suites/simple-inaccessible/index.js";
import enumIntersection from "./test-suites/enum-intersection/index.js";
import inputObjectIntersection from "./test-suites/input-object-intersection/index.js";
import requiresWithFragments from "./test-suites/requires-with-fragments/index.js";
import childTypeMismatch from "./test-suites/child-type-mismatch/index.js";
import nonResolvableInterfaceObject from "./test-suites/non-resolvable-interface-object/index.js";
import interfaceObjectWithRequires from "./test-suites/interface-object-with-requires/index.js";
import requiresInterface from "./test-suites/requires-interface/index.js";
import fed1ExternalExtends from "./test-suites/fed1-external-extends/index.js";
import fed2ExternalExtends from "./test-suites/fed2-external-extends/index.js";
import fed1ExternalExtension from "./test-suites/fed1-external-extension/index.js";
import fed2ExternalExtension from "./test-suites/fed2-external-extension/index.js";
import parentEntityCall from "./test-suites/parent-entity-call/index.js";
import corruptedSupergraphNodeId from "./test-suites/corrupted-supergraph-node-id/index.js";
import parentEntityCallComplex from "./test-suites/parent-entity-call-complex/index.js";
import sharedRoot from "./test-suites/shared-root/index.js";
import nestedProvides from "./test-suites/nested-provides/index.js";
import providesOnInterface from "./test-suites/provides-on-interface/index.js";
import providesOnUnion from "./test-suites/provides-on-union/index.js";
import requiresRequires from "./test-suites/requires-requires/index.js";
import includeSkip from "./test-suites/include-skip/index.js";
import circularReferenceInterface from "./test-suites/circular-reference-interface/index.js";
import typename from "./test-suites/typename/index.js";
import unionInterfaceDistributed from "./test-suites/union-interface-distributed/index.js";
import mutations from "./test-suites/mutations/index.js";
import abstractTypes from "./test-suites/abstract-types/index.js";
import fed1ExternalExtendsResolvable from "./test-suites/fed1-external-extends-resolvable/index.js";

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

export function serve(port: number): Promise<void> {
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
    testCase.createRoutes(router);
  }

  router.route({
    path: "*",
    handler: () => new Response("Not found", { status: 404 }),
  });

  const { resolve, reject, promise } = Promise.withResolvers<void>();

  let started = false;
  const server = createServer(router).listen(port, () => {
    started = true;
    resolve();
  });

  server.once("error", (error) => {
    if (!started) {
      reject(error);
    } else {
      process.stderr.write("Server error: " + String(error));
    }
  });

  function close() {
    if (server.listening) {
      server.close();
    }
  }

  server.once("close", () => {
    console.log("Server closed");
  });

  process.once("exit", () => {
    close();
  });

  process.once("SIGINT", () => {
    close();
  });

  process.once("SIGTERM", () => {
    close();
  });

  return promise;
}
