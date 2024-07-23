curl -L $1 > supergraph.graphql
./grafbase-gateway --schema supergraph.graphql --listen-address 127.0.0.1:4000