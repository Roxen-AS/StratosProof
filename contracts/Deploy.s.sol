// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "./StratosProofVerifier.sol";
import "./IntentEmitter.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        StratosProofVerifier verifier = new StratosProofVerifier();
        console2.log("Verifier deployed:", address(verifier));

        IntentEmitter emitter = new IntentEmitter();
        console2.log("Emitter deployed:", address(emitter));

        vm.stopBroadcast();
    }
}
