#!/bin/bash
set -e

RPC_URL="https://sepolia-rollup.arbitrum.io/rpc"
PRIVATE_KEY="0xdfdd5383bb3c156d20658cb4156906710e9c4a62409f2209c3565d84e2f6b952"

if [ -z "$PRIVATE_KEY" ]; then
  echo "PRIVATE_KEY not set" && exit 1
fi

echo "Deploying using Foundry..."
forge script contracts/Deploy.s.sol:Deploy \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  -vvvv
