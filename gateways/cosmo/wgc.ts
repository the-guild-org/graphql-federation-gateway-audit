import { writeFileSync, readdirSync, unlinkSync } from "node:fs";

for (const file of readdirSync("subgraphs")) {
  if (file.endsWith(".graphql")) {
    unlinkSync(`subgraphs/${file}`);
  }
}

const [, , supergraphUrl] = process.argv;

const subgraphsUrl = supergraphUrl.replace("supergraph", "subgraphs");

const res = await fetch(subgraphsUrl);
const subgraphs = (await res.json()) as Array<{
  name: string;
  url: string;
  sdl: string;
}>;

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
