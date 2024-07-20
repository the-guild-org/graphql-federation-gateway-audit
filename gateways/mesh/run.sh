curl -L $1 > supergraph.graphql
npx --yes  @graphql-mesh/serve-cli@0.8.0 mesh-serve --port 4000