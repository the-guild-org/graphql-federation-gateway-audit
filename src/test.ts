import { ExecutionResult, GraphQLError } from "graphql";
import { createClient, fetchExchange } from "@urql/core";
import type { createTest } from "./testkit.js";
import { diff } from "jest-diff";
import { test } from "node:test";
import { deepStrictEqual } from "node:assert";

async function fetchTests(endpoint: string) {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch tests ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();

  return result as Array<ReturnType<typeof createTest>>;
}

const TESTS_ENDPOINT = process.env.TESTS_ENDPOINT;
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

assert(TESTS_ENDPOINT, "TESTS_ENDPOINT is required");
assert(GRAPHQL_ENDPOINT, "GRAPHQL_ENDPOINT is required");

console.log(`Using gateway at     ${GRAPHQL_ENDPOINT}`);
console.log(`Fetching tests from  ${TESTS_ENDPOINT}`);
console.log(`\n`);

const tests = await fetchTests(TESTS_ENDPOINT);

let index = 0;
for (const { query, expected: expectedResult, headers } of tests) {
  test(`${index++}`, async () => {
    if (Array.isArray(expectedResult)) {
      // we're testing @defer here
      const client = createClient({
        url: GRAPHQL_ENDPOINT,
        exchanges: [fetchExchange],
        fetchOptions: () => {
          return {
            headers: {
              Accept: "multipart/mixed",
              ...headers,
            },
          };
        },
      });

      const res = client.query(
        query,
        {},
        {
          requestPolicy: "network-only",
        }
      );

      const receivedResponses: Array<{
        data: Record<string, unknown> | null;
        errors: GraphQLError[] | null;
      }> = [];

      await new Promise<void>((resolve) => {
        let timeout: ReturnType<typeof setTimeout>;
        let unsubscribe: () => void = () => {};

        function unsubscribeAfterTime() {
          if (timeout) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(() => {
            unsubscribe();
            resolve();
          }, 5_000);
        }

        unsubscribeAfterTime();

        const subscription = res.subscribe((result) => {
          unsubscribeAfterTime();
          receivedResponses.push({
            data: result.data,
            errors: result.error?.graphQLErrors ?? null,
          });
        });

        unsubscribe = subscription.unsubscribe;
      });

      for (let i = 0; i < expectedResult.length; i++) {
        const expectedResultItem = expectedResult[i];
        const errorsOptional = typeof expectedResultItem.errors !== "boolean";
        const response = receivedResponses[i];

        const received = {
          data: response.data ?? null,
          errors: errorsOptional
            ? null
            : response.errors?.length
              ? true
              : false,
        };

        const expected = {
          data: expectedResultItem.data ?? null,
          errors: errorsOptional ? null : (expectedResultItem.errors ?? false),
        };

        deepStrictEqual(
          received,
          expected,
          [`Test failed for query`, query, diff(expected, received)].join("\n")
        );
      }

      return;
    }

    const response = await graphql(GRAPHQL_ENDPOINT, query, headers);

    const errorsOptional = typeof expectedResult.errors !== "boolean";

    const received = {
      data: response.data ?? null,
      errors: errorsOptional ? null : response.errors?.length ? true : false,
    };

    const expected = {
      data: expectedResult.data ?? null,
      errors: errorsOptional ? null : (expectedResult.errors ?? false),
    };

    let retryCount = 0;
    const maxRetries = 2;
    let testPassed = false;

    while (retryCount <= maxRetries && !testPassed) {
      try {
        deepStrictEqual(
          received,
          expected,
          [`Test failed for query`, query, diff(expected, received)].join("\n")
        );
        testPassed = true;
      } catch (error) {
        if (retryCount === maxRetries) {
          throw error;
        }
        retryCount++;
      }
    }
  });
}

function graphql(
  endpoint: string,
  query: string,
  headers: Record<string, string> = {}
) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(2000),
  }).then((response) => response.json()) as Promise<ExecutionResult>;
}

function assert(value: unknown, message: string): asserts value {
  if (!value) {
    throw new Error(message);
  }
}
