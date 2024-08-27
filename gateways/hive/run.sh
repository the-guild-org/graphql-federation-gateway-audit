npm start supergraph -- --cwd ./gateways/hive --test $1
npx --yes @graphql-mesh/serve-cli@0.11.5 supergraph supergraph.graphql --port 4000 --fork 1
