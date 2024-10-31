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
kind: Gateway
name: audit
label: dev
spec:
  composition: ApolloFederation_v2
  services:
`;

for (const subgraph of subgraphs) {
  writeFileSync(`subgraphs/${subgraph.name}.graphql`, subgraph.sdl, "utf-8");

  yaml += `
    - name: ${subgraph.name}
      url: ${subgraph.url}
      schema_files:
        - ./subgraphs/${subgraph.name}.graphql
`;
}

writeFileSync("local.yaml", yaml, "utf-8");
