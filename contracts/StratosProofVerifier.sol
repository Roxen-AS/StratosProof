// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StratosProofVerifier {
    address public admin;
    mapping(bytes32 => bool) public anchoredRoots;

    event RootAnchored(bytes32 indexed root, address indexed by, uint256 timestamp);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "NOT_ADMIN");
        _;
    }

    function registerRoot(bytes32 root) external onlyAdmin {
        anchoredRoots[root] = true;
        emit RootAnchored(root, msg.sender, block.timestamp);
    }

    function isAnchored(bytes32 root) external view returns (bool) {
        return anchoredRoots[root];
    }

    function verifyProof(
        bytes32 leaf,
        bytes32[] calldata siblings,
        uint256 index,
        bytes32 root
    ) public pure returns (bool) {
        bytes32 hash = leaf;

        for (uint256 i = 0; i < siblings.length; i++) {
            if (index % 2 == 1) {
                hash = keccak256(abi.encodePacked(siblings[i], hash));
            } else {
                hash = keccak256(abi.encodePacked(hash, siblings[i]));
            }
            index = index / 2;
        }

        return hash == root;
    }
}
