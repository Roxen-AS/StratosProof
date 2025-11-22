// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IntentEmitter {
    event CrossIntent(
        address indexed user,
        uint256 amount,
        uint256 intentId,
        uint256 timestamp
    );

    uint256 public nextIntentId;

    function fireIntent(uint256 amount) external {
        emit CrossIntent(msg.sender, amount, nextIntentId, block.timestamp);
        nextIntentId++;
    }
}
