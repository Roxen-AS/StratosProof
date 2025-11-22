#!/bin/bash
set -e


RPC_URL=${RPC_URL:-"https://sepolia-rollup.arbitrum.io/rpc"}
PRIVATE_KEY=${PRIVATE_KEY}


if [ -z "$PRIVATE_KEY" ]; then
echo "PRIVATE_KEY not set" && exit 1
fi


echo "Deploying using Foundry..."
forge script contracts/Deploy.s.sol:Deploy \
--rpc-url $RPC_URL \
--private-key $PRIVATE_KEY \
--broadcast \
-vvvv