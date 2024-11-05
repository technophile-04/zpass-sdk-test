// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Poseidon.sol";
import "./Groth16Verifier.sol";

abstract contract PotionTokenContract {
    function mint(address to, uint256 amount) public virtual;
}

contract FrogCryptoSqueeze is Groth16Verifier, Poseidon {
    // The known hash of the FrogCrypto signer
    uint256 constant FROGCRYPTO_SIGNER_HASH =
        320469162396708332516033932244029190181315114284264408621970394677041964715;

    // Mapping from frogId to squeeze timestamp
    mapping(uint256 => uint256) public squeezeTimestamps;

    PotionTokenContract public rarityTokenContract;
    PotionTokenContract public temperamentTokenContract;
    PotionTokenContract public jumpTokenContract;
    PotionTokenContract public speedTokenContract;
    PotionTokenContract public intelligenceTokenContract;
    PotionTokenContract public beautyTokenContract;

    struct ProofArgs {
        uint256[2] _pA;
        uint256[2][2] _pB;
        uint256[2] _pC;
        uint256[60] _pubSignals;
    }

    struct FrogAttributes {
        uint256 beauty;
        uint256 biome;
        uint256 intelligence;
        uint256 jump;
        uint256 speed;
        uint256 rarity;
        uint256 owner;
        uint256 temprament;
        uint256 frogId;
    }

    event Squeeze(
        uint256 indexed frogId,
        address indexed owner,
        uint256 rarityReward,
        uint256 temperamentReward,
        uint256 jummpReward,
        uint256 speedReward,
        uint256 intelligenceReward,
        uint256 beautyReward
    );

    modifier verifiedProof(ProofArgs calldata proof) {
        require(this.verifyProof(proof._pA, proof._pB, proof._pC, proof._pubSignals), "Invalid proof");
        _;
    }

    constructor(
        address rarityTokenAddress,
        address temperamentTokenAddress,
        address jumpTokenAddress,
        address speedTokenAddress,
        address intelligenceTokenAddress,
        address beautyTokenAddress
    ) {
        rarityTokenContract = PotionTokenContract(rarityTokenAddress);
        temperamentTokenContract = PotionTokenContract(temperamentTokenAddress);
        jumpTokenContract = PotionTokenContract(jumpTokenAddress);
        speedTokenContract = PotionTokenContract(speedTokenAddress);
        intelligenceTokenContract = PotionTokenContract(intelligenceTokenAddress);
        beautyTokenContract = PotionTokenContract(beautyTokenAddress);
    }

    function squeezeFrog(ProofArgs calldata proof, FrogAttributes calldata attributes, address owner) public {
        // First verify the proof and attributes
        require(verifyFrogAttributes(proof, attributes), "Invalid frog attributes");

        // TODO: change cooldown period and owner to frogId
        require(
            squeezeTimestamps[attributes.owner] + 1 minutes < block.timestamp,
            "Squeeze: Cooldown period is not over yet"
        );

        // TODO: change owner to frogId
        squeezeTimestamps[attributes.owner] = block.timestamp;

        // TODO: change owner to frogId
        bytes32 predictableRandom = keccak256(
            abi.encodePacked(attributes.owner, blockhash(block.number - 1), msg.sender, address(this))
        );

        uint256 rarityAmount = ((uint256(uint8(predictableRandom[0])) % 10) + 1) * (attributes.rarity + 1);
        // uint256 temperamentAmount = ((uint256(uint8(predictableRandom[1])) % 10) + 1) * (attributes.temperament + 1);
        uint256 jumpAmount = ((uint256(uint8(predictableRandom[2])) % 10) + 1) * (attributes.jump + 1);
        uint256 speedAmount = ((uint256(uint8(predictableRandom[3])) % 10) + 1) * (attributes.speed + 1);
        uint256 intelligenceAmount = ((uint256(uint8(predictableRandom[4])) % 10) + 1) * (attributes.intelligence + 1);
        uint256 beautyAmount = ((uint256(uint8(predictableRandom[5])) % 10) + 1) * (attributes.beauty + 1);

        rarityTokenContract.mint(owner, rarityAmount);
        // temperamentTokenContract.mint(owner, temperamentAmount);
        jumpTokenContract.mint(owner, jumpAmount);
        speedTokenContract.mint(owner, speedAmount);
        intelligenceTokenContract.mint(owner, intelligenceAmount);
        beautyTokenContract.mint(owner, beautyAmount);

        // TODO: change owner to frogId
        emit Squeeze(
            attributes.owner,
            owner,
            rarityAmount,
            0,
            jumpAmount,
            speedAmount,
            intelligenceAmount,
            beautyAmount
        );
    }

    function verifyFrogAttributes(ProofArgs calldata proof, FrogAttributes calldata attrs) public view returns (bool) {
        uint256[60] memory pubSignals = proof._pubSignals;

        // Verify FrogCrypto signer
        require(pubSignals[25] == FROGCRYPTO_SIGNER_HASH, "Invalid signer");

        uint256[1] memory input;

        // Verify beauty
        input[0] = attrs.beauty;
        require(this.hash(input) == pubSignals[0], "Invalid beauty value");

        // Verify biome
        input[0] = attrs.biome;
        require(this.hash(input) == pubSignals[1], "Invalid biome value");

        // verify frogId
        input[0] = attrs.frogId;
        require(this.hash(input) == pubSignals[3], "Invalid frogId value");

        // Verify intelligence
        input[0] = attrs.intelligence;
        require(this.hash(input) == pubSignals[4], "Invalid intelligence value");

        // Verify jump
        input[0] = attrs.jump;
        require(this.hash(input) == pubSignals[5], "Invalid jump value");

        // Verify owner
        input[0] = attrs.owner;
        require(this.hash(input) == pubSignals[7], "Invalid owner value");

        // Verify rarity
        input[0] = attrs.rarity;
        require(this.hash(input) == pubSignals[8], "Invalid rarity value");

        // Verify speed
        input[0] = attrs.speed;
        require(this.hash(input) == pubSignals[9], "Invalid speed value");

        input[0] = attrs.temprament;
        require(this.hash(input) == pubSignals[10], "Invalid speed value");

        return true;
    }
}
