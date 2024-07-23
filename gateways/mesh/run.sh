echo "Downloading supergraph.graphql from $1"
curl -L $1 > supergraph.graphql
npx --yes @graphql-mesh/serve-cli@0.8.1-alpha-20240723155057-eb04c5aec6bd3edd0c788e7c5b7a402edc5623c5 mesh-serve --fork 1