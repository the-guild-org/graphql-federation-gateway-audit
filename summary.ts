import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const resultFiles = readdirSync(".").filter(
  (file) => file.includes("results_") && file.endsWith(".txt")
);

let summary = "";

for (const filepath of resultFiles) {
  const gateway = filepath.split("results_")[1].split(".")[0];
  const content = readFileSync(filepath, "utf-8");
  const lines = content.split("\n");

  let success = 0;
  let failure = 0;

  for (const line of lines) {
    if (!line.startsWith(".") && !line.startsWith("X")) {
      continue;
    }

    for (const char of line) {
      if (char === ".") {
        success++;
      } else {
        failure++;
      }
    }
  }

  summary += `${gateway}: ${Math.round(
    (100 * success) / (success + failure)
  )}% ${success}/${failure + success}\n`;
}

writeFileSync("summary.txt", summary);
