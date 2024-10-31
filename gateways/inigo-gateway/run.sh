npm start subgraphs -- --cwd ./gateways/inigo-gateway --test $1
npx tsx ./inigo.js

./inigo compose local.yaml > supergraph.graphql

./inigo_gateway --schema supergraph.graphql --config gateway.yaml