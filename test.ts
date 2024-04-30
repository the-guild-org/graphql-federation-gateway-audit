/**
 * $ npm run test <id>
 */

import { ExecutionResult } from "graphql";
import { fetchTests } from "./src/test";
import { diff } from "jest-diff";
import { describe, test } from "node:test";
import { deepStrictEqual } from "node:assert";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:4200";
const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:4000";
const [, , id] = process.argv;
const testsEndpoint = `${BASE_URL}/${id}/tests`;

if (!id) {
  console.error("Usage: npm run test <id>");
  process.exit(1);
}

console.log(`Running tests for    ${id}`);
console.log(`Using gateway at     ${GATEWAY_URL}`);
console.log(`Fetching tests from  ${testsEndpoint}`);
console.log(`\n`);

const tests = await fetchTests(testsEndpoint);

describe(id, () => {
  let index = 0;
  for (const { query, expected } of tests) {
    test(`${index++}`, async () => {
      const response = await graphql(GATEWAY_URL, query);

      const received = {
        data: response.data ?? null,
        errors: response.errors?.length ? true : false,
      };

      const expectedResult = {
        data: expected.data ?? null,
        errors: expected.errors ?? false,
      };

      deepStrictEqual(
        expectedResult,
        received,
        [`Test failed for query`, query, diff(expectedResult, received)].join("\n")
      );
    });
  }
});

console.log("All tests passed");

function graphql(endpoint: string, query: string) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json()) as Promise<ExecutionResult>;
}
