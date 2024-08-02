#!/usr/bin/env node

process.removeAllListeners("warning");

import {
  writeFileSync,
  createWriteStream,
  mkdirSync,
  existsSync,
  readFileSync,
} from "node:fs";
import yargs from "yargs";
import waitOn from "wait-on";
import getPort from "get-port";
import { spawn } from "node:child_process";
import { hideBin } from "yargs/helpers";
import { run } from "node:test";
import { tap } from "node:test/reporters";
import { styleText } from "node:util";
import { killPortProcess } from "kill-port-process";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "./index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ext = extname(fileURLToPath(import.meta.url));

const defaultPort = 4200;

function readPort(address: string) {
  return new URL(address).port;
}

function resolvePath(
  argv: {
    cwd: string;
  },
  path: string
) {
  if (path.startsWith("/")) {
    return path;
  }
  return join(argv.cwd, path);
}

yargs(hideBin(process.argv))
  .scriptName("graphql-federation-audit")
  .epilogue(
    "for more information, find our manual at https://github.com/the-guild-org/federation-compatibility"
  )
  .version(readVersion() ?? "local")
  .recommendCommands()
  .option("cwd", {
    describe: "Change the current working directory",
    type: "string",
    default: process.cwd(),
  })
  .command(
    "serve",
    "start the server",
    (yargs) => {
      return yargs.option("port", {
        describe: "port to bind on",
        default: defaultPort,
      });
    },
    async (argv) => {
      await serve(argv.port);
      console.log("Server started on port", argv.port);
    }
  )
  .command(
    "supergraph",
    "fetch a supergraph.graphql for a test group",
    (yargs) => {
      return yargs
        .option("test", {
          describe: "test group id",
          type: "string",
        })
        .option("port", {
          describe: "port to bind on",
          default: defaultPort,
        })
        .demandOption("test");
    },
    async (argv) => {
      const res = await fetch(
        `http://localhost:${argv.port}/${argv.test}/supergraph`
      );

      if (!res.ok) {
        process.stderr.write("Failed to fetch supergraph");
        process.stderr.write(`HTTP ${res.status} ${res.statusText}`);
        process.stderr.write('Body: "' + (await res.text()) + '"');
        process.exit(1);
      }

      writeFileSync(resolvePath(argv, "supergraph.graphql"), await res.text());
      process.exit(0);
    }
  )
  .command(
    "subgraphs",
    "fetch a subgraphs.json for a test group",
    (yargs) => {
      return yargs
        .option("test", {
          describe: "test group id",
          type: "string",
        })
        .option("port", {
          describe: "port to bind on",
          default: defaultPort,
        })
        .demandOption("test");
    },
    async (argv) => {
      const endpoint = `http://localhost:${argv.port}/${argv.test}/subgraphs`;
      const res = await fetch(endpoint, {
        headers: {
          accept: "application/json",
        },
      });

      if (!res.ok) {
        process.stderr.write("Failed to fetch subgraphs: " + endpoint);
        process.stderr.write(`HTTP ${res.status} ${res.statusText}`);
        process.stderr.write('Body: "' + (await res.text()) + '"');
        process.exit(1);
      }

      writeFileSync(resolvePath(argv, "subgraphs.json"), await res.text());
      process.exit(0);
    }
  )
  .command(
    "test-suite",
    "run a test group",
    (yargs) => {
      return yargs
        .option("test", {
          describe: "Test group id",
          type: "string",
        })
        .option("run-script", {
          describe: "Path to a bash script to run before each test",
          type: "string",
        })
        .option("graphql", {
          describe: "GraphQL endpoint serving the supergraph",
          type: "string",
        })
        .option("healthcheck", {
          describe: "Health check endpoint",
          type: "string",
        })
        .option("port", {
          describe: "Port to bind on",
          default: defaultPort,
        })
        .option("no-server", {
          describe: "Skip starting the server",
          type: "boolean",
          default: false,
        })
        .option("reporter", {
          describe: "Choose a reporter",
          choices: ["dot", "tap"],
          default: "tap",
        })
        .demandOption("test")
        .demandOption("graphql")
        .demandOption("healthcheck")
        .demandOption("run-script");
    },
    async (argv) => {
      const abortSignal = new AbortController();
      process.once("SIGINT", () => {
        if (!abortSignal.signal.aborted) {
          abortSignal.abort();
        }
      });
      process.once("SIGTERM", () => {
        if (!abortSignal.signal.aborted) {
          abortSignal.abort();
        }
      });

      const port = argv.port ?? (await getPort());
      if (!argv["no-server"]) {
        await serve(port);
      }

      process.stdout.write("\n");

      if (!existsSync(resolvePath(argv, "./logs"))) {
        mkdirSync(resolvePath(argv, "./logs"));
      }

      await killPortProcess(readPort(argv.graphql)).catch(() => {});
      const logStream = createWriteStream(
        resolvePath(argv, `./logs/${argv.test}-gateway.log`),
        {
          flags: "w+",
        }
      );

      const gatewayExit = Promise.withResolvers<void>();
      let gatewayExited = false;
      const gateway = spawn("sh", [argv.runScript, argv.test], {
        signal: abortSignal.signal,
        stdio: "pipe",
        cwd: dirname(resolvePath(argv, argv.runScript)),
      });

      gateway.once("exit", () => {
        gatewayExited = true;
        gatewayExit.resolve();
      });

      gateway.stdout.pipe(logStream);
      gateway.stderr.pipe(logStream);

      const result = await runTest({
        ...argv,
        reporter: argv.reporter === "tap" ? "tap" : "dot",
        port,
      });

      if (!gatewayExited) {
        gateway.kill();
      }
      await gatewayExit.promise;
      process.stdout.write("\n");

      if (result.includes("X")) {
        process.exit(1);
      } else {
        process.exit(0);
      }
    }
  )
  .command(
    "test",
    "run all test groups in a sequence",
    (yargs) => {
      return yargs
        .option("run-script", {
          describe: "Path to a bash script to run before each test",
          type: "string",
        })
        .option("no-server", {
          describe: "Skip starting the server",
          type: "boolean",
          default: false,
        })
        .option("graphql", {
          describe: "GraphQL endpoint serving the supergraph",
          type: "string",
        })
        .option("healthcheck", {
          describe: "Health check endpoint",
          type: "string",
        })
        .option("port", {
          describe: "Port to bind on",
          default: defaultPort,
        })
        .option("reporter", {
          describe: "Choose a reporter",
          choices: ["dot", "tap"],
          default: "dot",
        })
        .option("write", {
          describe: "Write test results to a file",
          type: "string",
          default: "results.txt",
        })
        .option("exit-on-fail", {
          describe: "Exit with status 1 if any test fails",
          type: "boolean",
          default: false,
        })
        .demandOption("graphql")
        .demandOption("healthcheck")
        .demandOption("run-script");
    },
    async (argv) => {
      const abortSignal = new AbortController();
      process.once("SIGINT", () => {
        if (!abortSignal.signal.aborted) {
          abortSignal.abort();
        }
      });
      process.once("SIGTERM", () => {
        if (!abortSignal.signal.aborted) {
          abortSignal.abort();
        }
      });

      const port = argv.port ?? (await getPort());

      if (!argv["no-server"]) {
        await serve(port);
      }

      const ids = await fetch(`http://localhost:${port}/ids`, {
        signal: abortSignal.signal,
      }).then((res) => res.json() as Promise<string[]>);

      const results: Array<{
        id: string;
        result: Array<"." | "X">;
      }> = [];

      process.stdout.write("Running " + ids.length + " tests\n");

      if (!existsSync(resolvePath(argv, "./logs"))) {
        mkdirSync(resolvePath(argv, "./logs"));
      }

      process.stdout.write("\n");
      for await (const id of ids) {
        await killPortProcess(readPort(argv.graphql)).catch(() => {});
        const logStream = createWriteStream(
          resolvePath(argv, `./logs/${id}-gateway.log`),
          {
            flags: "w+",
          }
        );

        const gatewayExit = Promise.withResolvers<void>();
        let gatewayExited = false;
        const gateway = spawn("sh", [argv.runScript, id], {
          signal: abortSignal.signal,
          stdio: "pipe",
          cwd: dirname(resolvePath(argv, argv.runScript)),
        });

        gateway.once("exit", () => {
          gatewayExited = true;
          gatewayExit.resolve();
        });

        gateway.stdout.pipe(logStream);
        gateway.stderr.pipe(logStream);

        const result = await runTest({
          test: id,
          graphql: argv.graphql,
          healthcheck: argv.healthcheck,
          port: argv.port,
          reporter: argv.reporter === "tap" ? "tap" : "dot",
          cwd: argv.cwd,
        });
        results.push({ id, result });

        if (!gatewayExited) {
          gateway.kill();
        }
        await gatewayExit.promise;
      }

      let total = 0;
      let passed = 0;
      let failed = 0;
      for (const { result } of results) {
        for (const test of result) {
          if (test === ".") {
            total++;
            passed++;
          } else if (test === "X") {
            total++;
            failed++;
          }
        }
      }

      process.stdout.write("\n\n\n");

      process.stdout.write(styleText("bold", "Results") + "\n");
      process.stdout.write("-----------\n");
      process.stdout.write(`Total:  ${total}\n`);
      process.stdout.write(
        `Passed: ${styleText("greenBright", passed + "")}\n`
      );
      if (failed > 0) {
        process.stdout.write(
          `Failed: ${styleText("redBright", failed + "")}\n`
        );
      }
      process.stdout.write("\n");

      if (failed > 0) {
        process.stdout.write(
          styleText("redBright", "Your gateway is not fully compatible\n")
        );
      } else {
        process.stdout.write(
          styleText("greenBright", "Your gateway is fully compatible\n")
        );
      }

      writeFileSync(
        resolvePath(argv, argv.write),
        results
          .flatMap((r) => [r.id, r.result.join("")])
          .concat([
            "",
            "---",
            `Total: ${total}`,
            `Passed: ${passed}`,
            `Failed: ${failed}`,
          ])
          .join("\n")
      );

      if (argv["exit-on-fail"] && failed > 0) {
        process.exit(1);
      }
      process.exit(0);
    }
  )
  .demandCommand(1)
  .parse();

async function runTest(args: {
  test: string;
  graphql: string;
  healthcheck?: string;
  port: number;
  reporter?: "dot" | "tap";
  cwd: string;
}): Promise<Array<"." | "X">> {
  process.stdout.write(`${args.test}\n`);
  process.env.TESTS_ENDPOINT = `http://localhost:${args.port}/${args.test}/tests`;
  process.env.GRAPHQL_ENDPOINT = args.graphql;

  const logStream = createWriteStream(
    resolvePath({ cwd: args.cwd }, `./logs/${args.test}-tests.log`),
    {
      flags: "w+",
    }
  );

  if (args.healthcheck) {
    try {
      await waitOn({
        // Make sure the health check is a GET request
        resources: [args.healthcheck.replace("http://", "http-get://")],
        timeout: 5_000,
        httpTimeout: 200,
        log: false,
        verbose: false,
      });
    } catch (err) {
      logStream.write("\nHealth check failed\n");
    }
  }

  const { resolve, promise } = Promise.withResolvers<Array<"." | "X">>();
  const dotan = createDotReporter(resolve);

  const testStream = run({
    concurrency: 1,
    files: [join(__dirname, `test${ext}`)],
  });

  testStream.compose(args.reporter === "tap" ? tap : dot).pipe(process.stdout);
  testStream.compose(tap).pipe(logStream);
  testStream.compose(dotan);

  return promise;
}

function createDotReporter(resolve: (value: Array<"." | "X">) => void) {
  const report: Array<"." | "X"> = [];
  return async function* dot(source: Parameters<typeof tap>[0]) {
    for await (const { type } of source) {
      if (type === "test:pass") {
        report.push(".");
      }
      if (type === "test:fail") {
        report.push("X");
      }
    }
    resolve(report);
  };
}

async function* dot(source: any) {
  let count = 0;
  let columns = getLineLength();
  const failedTests = [];
  for await (const { type, data } of source) {
    if (type === "test:pass") {
      yield styleText("green", ".");
    }
    if (type === "test:fail") {
      yield styleText("red", "X");
      failedTests.push(data);
    }
    if ((type === "test:fail" || type === "test:pass") && ++count === columns) {
      yield "\n";
      // Getting again in case the terminal was resized.
      columns = getLineLength();
      count = 0;
    }
  }
  yield "\n";
}

function getLineLength() {
  return Math.max(process.stdout.columns ?? 20, 20);
}

function readVersion(): string | undefined {
  try {
    // src/cli.ts
    return (
      "v" +
      JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"))
        .version
    );
  } catch {
    //
  }

  try {
    // dist/cli.js
    return (
      "v" +
      JSON.parse(readFileSync(join(__dirname, "./package.json"), "utf-8"))
        .version
    );
  } catch {
    //
  }
}
