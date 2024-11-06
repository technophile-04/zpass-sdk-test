import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Poseidon", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  // TODO: move to scaffold.config
  const tokens = [
    {
      attribute: "Rarity",
      name: "Mystic Relic",
      symbol: "🔮",
    },
    {
      attribute: "Jump",
      name: "Skybound Crest",
      symbol: "🌌",
    },
    {
      attribute: "Speed",
      name: "Zephyr Token",
      symbol: "🍃",
    },
    {
      attribute: "Intelligence",
      name: "Sage's Sigil",
      symbol: "🧠",
    },
    {
      attribute: "Beauty",
      name: "Enchantress' Tear",
      symbol: "🌺",
    }
  ];

  const tokensContracts = [];

  for (const token of tokens) {
    const contractName = `FrogCrypto${token.attribute}Token`;
    await deploy(contractName, {
      from: deployer,
      args: [token.name, token.symbol],
      log: true,
      autoMine: true,
      contract: "PotionToken",
    });

    tokensContracts.push(await hre.ethers.getContract<Contract>(contractName, deployer));

    console.log(`💵 ${contractName} deployed`);
  }

  const tokensContractsAddresses = [];

  for (const tokenContract of tokensContracts) {
    tokensContractsAddresses.push(await tokenContract.getAddress());
  };

  // :: FrogCryptoSqueeze ::
  const frogCryptoContract = await deploy("FrogCryptoSqueeze", {
    from: deployer,
    args: tokensContractsAddresses,
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  console.log("🐸 FrogCryptoSqueeze deployed");

  for (const tokenContract of tokensContracts) {
    await tokenContract.grantMinterRole(frogCryptoContract.address);
  }

  console.log("🔑 Minter role granted to FrogCryptoSqueeze");

  const tokensOwner = "";
  if (tokensOwner) {
    for (const tokenContract of tokensContracts) {
      await tokenContract.transferOwnership(tokensOwner);
    }

    console.log("🔑 Tokens ownership transferred to", tokensOwner);
  }
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
