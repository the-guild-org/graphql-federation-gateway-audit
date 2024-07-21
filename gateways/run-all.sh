#!/bin/bash

BASE_URL=$1 # https://federation-compatibility.the-guild.dev
GATEWAY=$2 # grafbase
GRAPHQL_ENDPOINT=$3 # http://127.0.0.1:4000/graphql
GATEWAY_HEALTH_CHECK=$4 # http://127.0.0.1:4000/health

# create a new file to store the test results
rm -rf "../results_$GATEWAY.txt"
lsof -t -i tcp:4000 | xargs kill

cleanup() {
  echo "Terminating script..."
  exit 1
}

# trap SIGINT (Ctrl+C) and call the cleanup function
trap cleanup SIGINT

for TEST_SUITE_ID in $(curl -s $BASE_URL/ids | jq -r '.[]'); do
  ./run-single.sh $TEST_SUITE_ID $BASE_URL $GATEWAY $GRAPHQL_ENDPOINT $GATEWAY_HEALTH_CHECK
  run_sh_pid=$!
  # wait for the background process to complete
  wait $run_sh_pid
done

