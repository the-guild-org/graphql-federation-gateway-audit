import { createRouter, Response } from "fets";
import { createServer } from "node:http";

const testCases = await Promise.all(
  [
    import("./test-suites/union-intersection/index.js"),
    import("./test-suites/simple-entity-call/index.js"),
    import("./test-suites/complex-entity-call/index.js"),
    import("./test-suites/mysterious-external/index.js"),
    import("./test-suites/simple-requires-provides/index.js"),
    import("./test-suites/override-type-interface/index.js"),
    import("./test-suites/simple-interface-object/index.js"),
    import("./test-suites/simple-override/index.js"),
    import("./test-suites/unavailable-override/index.js"),
    import("./test-suites/override-with-requires/index.js"),
    import("./test-suites/node/index.js"),
    import("./test-suites/simple-inaccessible/index.js"),
    import("./test-suites/enum-intersection/index.js"),
    import("./test-suites/input-object-intersection/index.js"),
    import("./test-suites/requires-with-fragments/index.js"),
    import("./test-suites/child-type-mismatch/index.js"),
    import("./test-suites/non-resolvable-interface-object/index.js"),
    import("./test-suites/interface-object-with-requires/index.js"),
    import("./test-suites/requires-interface/index.js"),
    import("./test-suites/fed1-external-extends/index.js"),
    import("./test-suites/fed2-external-extends/index.js"),
    import("./test-suites/fed1-external-extension/index.js"),
    import("./test-suites/fed2-external-extension/index.js"),
    import("./test-suites/parent-entity-call/index.js"),
    import("./test-suites/corrupted-supergraph-node-id/index.js"),
    import("./test-suites/parent-entity-call-complex/index.js"),
    import("./test-suites/shared-root/index.js"),
    import("./test-suites/nested-provides/index.js"),
    import("./test-suites/provides-on-interface/index.js"),
    import("./test-suites/provides-on-union/index.js"),
    import("./test-suites/requires-requires/index.js"),
    import("./test-suites/include-skip/index.js"),
    import("./test-suites/circular-reference-interface/index.js"),
    import("./test-suites/typename/index.js"),
    import("./test-suites/union-interface-distributed/index.js"),
    import("./test-suites/mutations/index.js"),
    import("./test-suites/abstract-types/index.js"),
    import("./test-suites/fed1-external-extends-resolvable/index.js"),
    import("./test-suites/requires-with-argument/index.js"),
    import("./test-suites/keys-mashup/index.js"),
    import ("./test-suites/nested-requires/index.js"),
  ].map((i) => i.then((e) => e.default)),
);

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
        testCases.map(({ id }) => `${req.parsedUrl.origin}/${id}/supergraph`),
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
        testCases.map(({ id }) => `${req.parsedUrl.origin}/${id}/tests`),
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
        testCases.map(({ id }) => `${req.parsedUrl.origin}/${id}/subgraphs`),
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
