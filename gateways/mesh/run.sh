npm start supergraph -- --cwd ./gateways/mesh --test $1
npx --yes @graphql-mesh/serve-cli@0.11.5-alpha-20240826100406-67e75ba8acf7aca0d88205e2c50d4bc8003bb7cb supergraph supergraph.graphql --port 4000 --fork 1
