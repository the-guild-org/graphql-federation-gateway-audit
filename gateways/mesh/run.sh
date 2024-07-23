echo "Downloading supergraph.graphql from $1"
curl -L $1 > supergraph.graphql
npx --yes @graphql-mesh/serve-cli@0.8.1-alpha-20240723143736-4a9162a84a21477798641ad5f29cbed0b9943477 mesh-serve --fork 1