npm start supergraph -- --cwd ./gateways/mesh --test $1
npx --yes @graphql-mesh/serve-cli@0.9.0 mesh-serve --port 4000 --fork 1 --supergraph supergraph.graphql
