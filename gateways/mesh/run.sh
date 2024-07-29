node --run start -- supergraph --cwd ./gateways/mesh --test $1
npx --yes @graphql-mesh/serve-cli@0.8.1 mesh-serve --port 4000 --fork 1 --supergraph supergraph.graphql
