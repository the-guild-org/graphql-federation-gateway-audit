export function createTest(
  query: string,
  expected: {
    data?: any;
    errors?: boolean;
  },
  plan?: string
) {
  return {
    query,
    expected,
    plan,
  };
}

export async function fetchTests(endpoint: string) {
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
