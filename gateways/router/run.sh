curl -L $1 > supergraph.graphql
./router --supergraph supergraph.graphql --config router.yaml