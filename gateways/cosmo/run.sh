npm start subgraphs -- --cwd ./gateways/cosmo --test $1
npx tsx ./wgc.js
npx wgc router compose -i compose.yaml -o config.json
./cosmo