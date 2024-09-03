import { writeFileSync, readFileSync, readdirSync, unlinkSync } from "node:fs";

for (const file of readdirSync("subgraphs")) {
  if (file.endsWith(".graphql")) {
    unlinkSync(`subgraphs/${file}`);
  }
}

const subgraphs: Array<{
  name: string;
  url: string;
  sdl: string;
}> = JSON.parse(readFileSync("subgraphs.json", "utf-8"));

let yaml = `
version: 1
subgraphs:
`;

for (const subgraph of subgraphs) {
  writeFileSync(`subgraphs/${subgraph.name}.graphql`, subgraph.sdl, "utf-8");

  yaml += `
  - name: ${subgraph.name}
    routing_url: ${subgraph.url}
    schema:
      file: ./subgraphs/${subgraph.name}.graphql
`;
}

writeFileSync("compose.yaml", yaml, "utf-8");
