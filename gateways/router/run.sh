curl -L $1 > supergraph.graphql
./router --supergraph supergraph.graphql --listen 127.0.0.1:4000