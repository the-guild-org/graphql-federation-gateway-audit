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
# 10s
TIMEOUT=$6

echo "
Test suite id:
  $TEST_SUITE_ID

Test suite base url:
  $BASE_URL
  
Gateway:
  $GATEWAY
  
GraphQL endpoint:
  $GRAPHQL_ENDPOINT

Gateway health check:
  $GATEWAY_HEALTH_CHECK

Timeout:
  $TIMEOUT

"

cleanup() {
  echo "Terminating background process..."
  if [[ -n "$run_sh_pid" ]]; then
    echo "Killing process $run_sh_pid"
    kill -s TERM "$run_sh_pid" 2>/dev/null
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
mkdir -p "logs"
nohup ./run.sh $SUPERGRAPH_URL > logs/gateway-$TEST_SUITE_ID.log 2>&1 &
run_sh_pid=$!

echo "Waiting for gateway to start..."
npx --yes wait-on $GATEWAY_HEALTH_CHECK --timeout $TIMEOUT --httpTimeout 500ms --verbose
echo "Gateway started"

# Back to root directory
cd ../..
echo "Running tests..."
export TESTS_ENDPOINT
export GRAPHQL_ENDPOINT
npm run test-single || echo "Tests failed"

echo "Test suite complete"

echo "$TEST_SUITE_ID" >> "gateways/results_$GATEWAY.txt"
# append first line (dot reporter) of single.test.log
head -n 1 ./single.test.log >> "gateways/results_$GATEWAY.txt"

cleanup