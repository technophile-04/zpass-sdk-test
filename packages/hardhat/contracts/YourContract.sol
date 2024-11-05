// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Poseidon.sol";
import "./Groth16Verifier.sol";
import "hardhat/console.sol";

contract YourContract is ERC721, Groth16Verifier, Poseidon {
	// The known hash of the FrogCrypto signer
	uint256 constant FROGCRYPTO_SIGNER_HASH =
		320469162396708332516033932244029190181315114284264408621970394677041964715;

	uint256 private _nextTokenId;
	// Mapping from address to whether they've minted
	mapping(address => bool) public minted;
	// Mapping from token ID to owner address
	mapping(uint256 => address) public frogOwners;

	struct ProofArgs {
		uint256[2] _pA;
		uint256[2][2] _pB;
		uint256[2] _pC;
		uint256[56] _pubSignals;
	}

	struct FrogAttributes {
		uint256 beauty;
		uint256 biome;
		uint256 intelligence;
		uint256 jump;
		uint256 speed;
		uint256 rarity;
		uint256 owner;
	}

	event FrogMinted(uint256 tokenId, address owner, FrogAttributes attributes);

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

	modifier notMinted() {
		require(!minted[msg.sender], "Already minted");
		_;
	}

	constructor() ERC721("FrogCrypto", "FROG") {}

	function mintFrog(
		ProofArgs calldata proof,
		FrogAttributes calldata attributes
	) public notMinted returns (uint256) {
		// First verify the proof and attributes
		require(
			verifyFrogAttributes(proof, attributes),
			"Invalid frog attributes"
		);

		// Mint the NFT
		uint256 tokenId = _nextTokenId++;
		minted[msg.sender] = true;
		frogOwners[tokenId] = msg.sender;
		_safeMint(msg.sender, tokenId);

		emit FrogMinted(tokenId, msg.sender, attributes);

		return tokenId;
	}

	function verifyFrogAttributes(
		ProofArgs calldata proof,
		FrogAttributes calldata attrs
	) public view returns (bool) {
		uint256[56] memory pubSignals = proof._pubSignals;

		// Verify FrogCrypto signer
		require(pubSignals[23] == FROGCRYPTO_SIGNER_HASH, "Invalid signer");

		uint256[1] memory input;

		// Verify beauty
		input[0] = attrs.beauty;
		console.log(this.hash(input));
		// require(this.hash(input) == pubSignals[0], "Invalid beauty value");

		// Verify biome
		input[0] = attrs.biome;
		console.log(this.hash(input));
		// require(this.hash(input) == pubSignals[1], "Invalid biome value");
		//
		// Verify intelligence
		input[0] = attrs.intelligence;
		console.log(this.hash(input));
		// require(
		// 	this.hash(input) == pubSignals[2],
		// 	"Invalid intelligence value"
		// );

		// Verify jump
		input[0] = attrs.jump;
		console.log(this.hash(input));
		// require(this.hash(input) == pubSignals[3], "Invalid jump value");

		// Verify owner
		input[0] = attrs.owner;
		console.log(this.hash(input));
		// require(this.hash(input) == pubSignals[5], "Invalid owner value");

		// Verify rarity
		input[0] = attrs.rarity;
		console.log(this.hash(input));
		// require(this.hash(input) == pubSignals[6], "Invalid rarity value");

		// Verify speed
		input[0] = attrs.speed;
		console.log(this.hash(input));
		// require(this.hash(input) == pubSignals[7], "Invalid speed value");

		return true;
	}

	function tokenURI(
		uint256 _tokenId
	) public view override returns (string memory) {
		require(_exists(_tokenId), "Token does not exist");
		// customize this to return your frog metadata
		return "https://bg/frog-metadata/";
	}

	function getFrogOwner(uint256 tokenId) public view returns (address) {
		require(_exists(tokenId), "Token does not exist");
		return frogOwners[tokenId];
	}
}
