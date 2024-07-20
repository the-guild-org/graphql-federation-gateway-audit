import { ExecutionResult } from "graphql";
import { fetchTests } from "./src/test";
import { diff } from "jest-diff";
import { test } from "node:test";
import { deepStrictEqual } from "node:assert";

const TEST_CASE_URL = process.env.TEST_CASE_URL;
const GATEWAY_URL = process.env.GATEWAY_URL;

assert(TEST_CASE_URL, "TEST_CASE_URL is required");
assert(GATEWAY_URL, "GATEWAY_URL is required");

const testsEndpoint = `${TEST_CASE_URL}/tests`;

console.log(`Using gateway at     ${GATEWAY_URL}`);
console.log(`Fetching tests from  ${testsEndpoint}`);
console.log(`\n`);

const tests = await fetchTests(testsEndpoint);

let index = 0;
for (const { query, expected: expectedResult, plan: expectedPlan } of tests) {
  test(`${index++}`, async () => {
    const response = await graphql(GATEWAY_URL, query);

    const received = {
      data: response.data ?? null,
      errors: response.errors?.length ? true : false,
    };

    const expected = {
      data: expectedResult.data ?? null,
      errors: expectedResult.errors ?? false,
    };

    deepStrictEqual(
      expected,
      received,
      [`Test failed for query`, query, diff(expected, received)].join("\n")
    );
  });
}

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

function assert(value: unknown, message: string): asserts value {
  if (!value) {
    throw new Error(message);
  }
}
