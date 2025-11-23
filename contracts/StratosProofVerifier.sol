// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StratosProofVerifier {
    address public admin;
    mapping(bytes32 => bool) public roots;

    event RootAnchored(bytes32 indexed root, uint256 timestamp);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "NOT_ADMIN");
        _;
    }

    function registerRoot(bytes32 root) external onlyAdmin {
        roots[root] = true;
        emit RootAnchored(root, block.timestamp);
    }

    function isAnchored(bytes32 root) external view returns (bool) {
        return roots[root];
    }
}
