import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import prettier from "prettier";

const gatewayResults = readdirSync("./gateways")
  .filter((file) => statSync(join("./gateways", file)).isDirectory())
  .map((id) => {
    const gatewayDetails = JSON.parse(
      readFileSync(join("./gateways", id, "gateway.json"), "utf-8"),
    ) as { name: string; repository: string; website: string };

    const lines = readFileSync(
      join("./gateways", id, "results.txt"),
      "utf-8",
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
    const dot: Array<{
      group: string;
      results: string;
    }> = [];

    let collectingDetails = true;
    let previousGroupName: string | null = null;
    for (const line of lines) {
      if (collectingDetails) {
        if (line.charAt(0) === "." || line.charAt(0) === "X") {
          groups.total++;

          if (!line.includes("X")) {
            groups.passed++;
          }

          if (!previousGroupName) {
            throw new Error("No previous group found");
          }

          dot.push({
            group: previousGroupName,
            results: line.replaceAll(".", "🟢").replaceAll("X", "❌"),
          });
        } else if (line.trim() === "" || line === "---") {
          collectingDetails = false;
        } else {
          previousGroupName = line;
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

    const name = gatewayDetails?.name ?? id;

    return {
      id,
      name,
      repository: gatewayDetails.repository,
      website: gatewayDetails.website,
      groups,
      tests,
      dot,
    };
  });

gatewayResults.sort((a, b) => {
  const diff = b.tests.passed - a.tests.passed;

  if (diff !== 0) {
    // 9 -> 1
    return diff;
  }

  // A -> Z
  return a.name.localeCompare(b.name);
});

function printResult(
  result: { passed: number; failed: number },
  format: "md" | "html",
) {
  const scores: string[] = [];

  if (result.passed) {
    if (format === "md") {
      scores.push(`🟢 ${result.passed}`);
    } else {
      scores.push(
        `<span class="text-emerald-700 mr-2">✓ ${result.passed}</span>`,
      );
    }
  }

  if (result.failed) {
    if (format === "md") {
      scores.push(`❌ ${result.failed}`);
    } else {
      scores.push(`<span class="text-red-700">✗ ${result.failed}</span>`);
    }
  }

  return scores.join("  ");
}

let tableMd = `|  Gateway   | Compatibility | Test Cases | Test Suites |
| :---------------------------: | :-----------: | :----------: | :---------: |`;
let rowsHtml = ``;
let testDetailsMd = "";

for (const gateway of gatewayResults) {
  const score = ((gateway.tests.passed * 100) / gateway.tests.total).toFixed(2);
  const roundedScore = Math.round(
    (gateway.tests.passed * 100) / gateway.tests.total,
  );
  tableMd += `\n| [${gateway.name}](${gateway.website}) | ${score}% |  ${printResult(gateway.tests, "md")} | ${printResult(gateway.groups, "md")} |`;

  rowsHtml += `
    <tr class="border-b transition-colors hover:bg-gray-100/50">
      <td class="p-4 align-middle font-medium  border-l-2 border-${roundedScore === 100 ? "emerald" : roundedScore >= 75 ? "yellow" : "red"}-500">
        <a href="${gateway.website}" class="hover:underline" title="Visit ${gateway.name} website">
          ${gateway.name}
        </a>
      </td>
      <td class="p-4 align-middle font-semibold">${score}%</td>
      <td class="p-4 align-middle">
        ${printResult(gateway.tests, "html")}
      </td>
      <td class="p-4 align-middle">
        ${printResult(gateway.groups, "html")}
      </td>
      <td class="p-4 align-middle"><a href="https://github.com/the-guild-org/federation-compatibility/tree/main/REPORT.md#${gateway.id}" class="text-sky-700 hover:underline">View report</a></td>
    </tr>
  `;

  testDetailsMd += `\n<a id="${gateway.id}"></a>
### ${gateway.name}

- [Repository](${gateway.repository})
- [Website](${gateway.website})

<details>
<summary>Results</summary>\n`;

  for (const { group, results } of gateway.dot) {
    testDetailsMd += `<a href="./src/test-suites/${group}">${group}</a>\n<pre>${results}</pre>\n`;
  }

  testDetailsMd += `</details>\n`;
}

const reportMd = `# Compatibility Results

## Summary

${tableMd}

## Detailed Results

Take a closer look at the results for each gateway.

You can look at the full list of tests [here](./src/test-suites/). Every test id corresponds to a directory in the \`src/test-suites\` folder.
${testDetailsMd}`;

await writeFormatted("./REPORT.md", reportMd);

const readmeMd = readFileSync("./README.md", "utf-8");
const indexHtml = readFileSync("./website/index.html", "utf-8");

const startTag = "<!-- gateways:start -->";
const endTag = "<!-- gateways:end -->";
const mdStartAt = readmeMd.indexOf(startTag);
const mdEndAt = readmeMd.indexOf(endTag);
const htmlStartAt = indexHtml.indexOf(startTag);
const htmlEndAt = indexHtml.indexOf(endTag);

const newReadmeMd =
  readmeMd.substring(0, mdStartAt) +
  "\n\n" +
  startTag +
  "\n\n" +
  tableMd +
  "\n\n" +
  readmeMd.substring(mdEndAt);

await writeFormatted("./README.md", newReadmeMd);

const newIndexHtml =
  indexHtml.substring(0, htmlStartAt) +
  "\n" +
  startTag +
  "\n" +
  rowsHtml +
  "\n" +
  indexHtml.substring(htmlEndAt);

writeFormatted("./website/index.html", newIndexHtml);

async function writeFormatted(filename: string, content: string) {
  writeFileSync(
    filename,
    await prettier.format(content, {
      filepath: filename,
    }),
  );
}
