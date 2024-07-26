import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const gatewayIds = readdirSync("./gateways").filter((file) =>
  statSync(join("./gateways", file)).isDirectory()
);

const gatewayResults = gatewayIds.map((id) => {
  const lines = readFileSync(
    join("./gateways", id, "results.txt"),
    "utf-8"
  ).split("\n");

  const groups = {
    total: 0,
    passed: 0,
    failed: 0,
  };
  const tests = {
    total: 0,
    passed: 0,
    failed: 0,
  };
  for (const line of lines) {
    if (line.charAt(0) === "." || line.charAt(0) === "X") {
      groups.total++;

      if (!line.includes("X")) {
        groups.passed++;
      }
    } else if (line.startsWith("Passed:")) {
      tests.passed = parseInt(line.replace("Passed:", "").trim());
    } else if (line.startsWith("Failed:")) {
      tests.failed = parseInt(line.replace("Failed:", "").trim());
    } else if (line.startsWith("Total:")) {
      tests.total = parseInt(line.replace("Total:", "").trim());
    }
  }

  groups.failed = groups.total - groups.passed;

  return {
    id,
    groups,
    tests,
  };
});

gatewayResults.sort((a, b) => {
  const diff = b.tests.passed - a.tests.passed;

  if (diff !== 0) {
    // 9 -> 1
    return diff;
  }

  // A -> Z
  return a.id.localeCompare(b.id);
});

// TODO: generate a markdown files

console.log(gatewayResults);
