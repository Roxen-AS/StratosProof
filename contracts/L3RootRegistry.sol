// L3RootRegistry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract L3RootRegistry {
    address public admin;
    mapping(bytes32 => bool) public roots;
    event RootSubmitted(bytes32 indexed root, uint256 timestamp, address indexed submitter);

    constructor(address _admin) {
        admin = _admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "NOT_ADMIN");
        _;
    }

    // Called by indexer (relayer) to mark root on L3
    function submitRoot(bytes32 root) external onlyAdmin {
        require(!roots[root], "ALREADY_REGISTERED");
        roots[root] = true;
        emit RootSubmitted(root, block.timestamp, msg.sender);
    }

    // optional admin rotate
    function setAdmin(address _admin) external onlyAdmin {
        admin = _admin;
    }
}
