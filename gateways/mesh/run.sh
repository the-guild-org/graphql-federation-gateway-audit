echo "Downloading supergraph.graphql from $1"
curl -L $1 > supergraph.graphql
npx --yes @graphql-mesh/serve-cli@0.8.1 mesh-serve --fork 1