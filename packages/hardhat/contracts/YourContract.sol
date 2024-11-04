// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Poseidon.sol";
import "hardhat/console.sol";
import "./Groth16Verifier.sol";

contract YourContract is Groth16Verifier, Poseidon {
	// The known hash of the FrogCrypto signer
	uint256 constant FROGCRYPTO_SIGNER_HASH =
		320469162396708332516033932244029190181315114284264408621970394677041964715;

	struct ProofArgs {
		uint256[2] _pA;
		uint256[2][2] _pB;
		uint256[2] _pC;
		uint256[56] _pubSignals;
	}

	modifier verifiedProof(ProofArgs calldata proof) {
		require(
			this.verifyProof(
				proof._pA,
				proof._pB,
				proof._pC,
				proof._pubSignals
			),
			"Invalid proof"
		);
		_;
	}

	function verifyAndExtractFrog(
		ProofArgs calldata proof,
		// User provided values to verify
		uint256 beauty,
		uint256 biome,
		uint256 intelligence,
		uint256 jump,
		uint256 speed,
		uint256 rarity,
		uint256 owner
	) public view returns (bool) {
		uint256[56] memory pubSignals = proof._pubSignals;
		// Verify FrogCrypto signer
		require(pubSignals[23] == FROGCRYPTO_SIGNER_HASH, "Invalid signer");

		uint256[1] memory input;
		// Verify beauty
		input[0] = beauty;
		require(this.hash(input) == pubSignals[0], "Invalid beauty value");

		// Verify biome
		input[0] = biome;
		require(this.hash(input) == pubSignals[1], "Invalid biome value");

		// Verify intelligence
		input[0] = intelligence;
		require(
			this.hash(input) == pubSignals[2],
			"Invalid intelligence value"
		);

		// Verify jump
		input[0] = jump;
		require(this.hash(input) == pubSignals[3], "Invalid jump value");

		// Verify owner
		input[0] = owner;
		require(this.hash(input) == pubSignals[5], "Invalid owner value");

		// Verify rarity
		input[0] = rarity;
		require(this.hash(input) == pubSignals[6], "Invalid rarity value");

		// Verify speed
		input[0] = speed;
		require(this.hash(input) == pubSignals[7], "Invalid speed value");

		return true;
	}
}
