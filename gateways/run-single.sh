#!/bin/bash

# simple-entity-call
TEST_SUITE_ID=$1
# https://federation-compatibility.the-guild.dev
BASE_URL=$2
# grafbase
GATEWAY=$3
# http://127.0.0.1:4000/graphql
GRAPHQL_ENDPOINT=$4
# http://127.0.0.1:4000/health
GATEWAY_HEALTH_CHECK=$5

echo "
Test suite id:
  $TEST_SUITE_ID

Test suite base url:
  $BASE_URL
  
Gateway:
  $GATEWAY
  
GraphQL endpoint:
  $GRAPHQL_ENDPOINT

"

cleanup() {
  echo "Terminating background process..."
  if [[ -n "$run_sh_pid" ]]; then
    echo "Killing process $run_sh_pid"
    kill -TERM "$run_sh_pid" 2>/dev/null
  fi
  wait "$run_sh_pid" 2>/dev/null
  lsof -t -i tcp:4000 | xargs kill
  echo "Cleanup complete"
}

# Trap SIGINT (Ctrl+C) and call the cleanup function
trap cleanup SIGINT

SUPERGRAPH_URL="$BASE_URL/$TEST_SUITE_ID/supergraph"
TESTS_ENDPOINT="$BASE_URL/$TEST_SUITE_ID/tests"

echo "Starting gateway..."
cd "./$GATEWAY"
nohup ./run.sh $SUPERGRAPH_URL > gateway-$TEST_SUITE_ID.log 2>&1 &
run_sh_pid=$!

echo "Waiting for gateway to start..."
npx --yes wait-on $GATEWAY_HEALTH_CHECK --timeout 30s --httpTimeout 500ms --delay 5000
echo "Gateway started"

cd ../..
echo "Running tests..."
export TESTS_ENDPOINT
export GRAPHQL_ENDPOINT
npm run test-single || echo "Tests failed"

echo "Test suite complete"

echo "$TEST_SUITE_ID" >> "results_$GATEWAY.txt"
# append first line (dot reporter) of single.test.log
head -n 1 ./single.test.log >> "results_$GATEWAY.txt"

cleanup