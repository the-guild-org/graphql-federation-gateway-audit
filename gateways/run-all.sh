#!/bin/bash

BASE_URL=$1 # https://federation-compatibility.the-guild.dev
GATEWAY=$2 # grafbase
GRAPHQL_ENDPOINT=$3 # http://127.0.0.1:4000/graphql
GATEWAY_HEALTH_CHECK=$4 # http://127.0.0.1:4000/health
TIMEOUT=$5 # 10s
TEST_SUITES_TO_RUN_RAW=$6 # foo,bar,baz

# turn TEST_SUITES_TO_RUN into an array
IFS=',' read -r -a TEST_SUITES_TO_RUN <<< "$TEST_SUITES_TO_RUN_RAW"

# create a new file to store the test results
rm -rf "./results_$GATEWAY.txt"
# Kill any process running on port 4000
# Make it available for the gateway
lsof -t -i tcp:4000 | xargs kill

cleanup() {
  echo "Terminating script..."
  exit 1
}

# trap SIGINT (Ctrl+C) and call the cleanup function
trap cleanup SIGINT

for TEST_SUITE_ID in $(curl -s $BASE_URL/ids | jq -r '.[]'); do
  if [ ${#TEST_SUITES_TO_RUN[@]} -gt 0 ]; then
    if [[ ! " ${TEST_SUITES_TO_RUN[@]} " =~ " ${TEST_SUITE_ID} " ]]; then
      echo "Skipping test suite $TEST_SUITE_ID"
      continue
    fi
  fi

  ./run-single.sh $TEST_SUITE_ID $BASE_URL $GATEWAY $GRAPHQL_ENDPOINT $GATEWAY_HEALTH_CHECK $TIMEOUT
  run_sh_pid=$!
  # wait for the background process to complete
  wait $run_sh_pid
done

