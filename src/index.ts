import { createServer } from "node:http";
import { createRouter, Response } from "fets";
import unionIntersectionTestCase from "./test-cases/union-intersection/index.js";
import simpleEntityCallTestCase from "./test-cases/simple-entity-call/index.js";
import complexEntityCallTestCase from "./test-cases/complex-entity-call/index.js";
import mysteriousExternalTestCase from "./test-cases/mysterious-external/index.js";
import simpleRequiresProvidesTestCase from "./test-cases/simple-requires-provides/index.js";
import overrideTypeInterfaceTestCase from "./test-cases/override-type-interface/index.js";
import simpleInterfaceObjectTestCase from "./test-cases/simple-interface-object/index.js";
import simpleOverrideTestCae from "./test-cases/simple-override/index.js";
import unavailableOverrideTestCase from "./test-cases/unavailable-override/index.js";
import overrideWithRequiresTestCase from "./test-cases/override-with-requires/index.js";
import simpleInaccessible from "./test-cases/simple-inaccessible/index.js";
import enumIntersection from "./test-cases/enum-intersection/index.js";
import inputObjectIntersection from "./test-cases/input-object-intersection/index.js";
import requiresWithFragments from "./test-cases/requires-with-fragments/index.js";
import childTypeMismatch from "./test-cases/child-type-mismatch/index.js";
import nonResolvableInterfaceObject from "./test-cases/non-resolvable-interface-object/index.js";
import interfaceObjectWithRequires from "./test-cases/interface-object-with-requires/index.js";
import requiresInterface from "./test-cases/requires-interface/index.js";
import fed1ExternalExtends from "./test-cases/fed1-external-extends/index.js";
import fed2ExternalExtends from "./test-cases/fed2-external-extends/index.js";
import fed1ExternalExtension from "./test-cases/fed1-external-extension/index.js";
import fed2ExternalExtension from "./test-cases/fed2-external-extension/index.js";
import parentEntityCall from "./test-cases/parent-entity-call/index.js";
import corruptedSupergraphNodeId from "./test-cases/corrupted-supergraph-node-id/index.js";
import parentEntityCallComplex from "./test-cases/parent-entity-call-complex/index.js";
import sharedRoot from "./test-cases/shared-root/index.js";
import nestedProvides from "./test-cases/nested-provides/index.js";
import providesOnInterface from "./test-cases/provides-on-interface/index.js";
import providesOnUnion from "./test-cases/provides-on-union/index.js";
import requiresRequires from "./test-cases/requires-requires/index.js";
import includeSkip from "./test-cases/include-skip/index.js";
import circularReferenceInterface from "./test-cases/circular-reference-interface/index.js";
import typename from "./test-cases/typename/index.js";
import unionInterfaceDistributed from "./test-cases/union-interface-distributed/index.js";
import mutations from "./test-cases/mutations/index.js";
import abstractTypes from "./test-cases/abstract-types/index.js";
import fed1ExternalExtendsResolvable from "./test-cases/fed1-external-extends-resolvable/index.js";

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
