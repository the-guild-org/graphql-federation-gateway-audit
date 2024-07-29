node --run start -- supergraph --cwd ./gateways/grafbase --test $1
./grafbase-gateway --schema supergraph.graphql --listen-address 127.0.0.1:4000