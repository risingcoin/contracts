import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import type {
  HardhatUserConfig,
  HardhatRuntimeEnvironment,
} from "hardhat/types";
import * as dotenv from "dotenv";

// Load environment variables.
dotenv.config();
const {
  MNEMONIC,
  ALCHEMY_KEY,
  MAINNET_RPC_URL,
  ROPSTEN_RPC_URL,
  RINKEBY_RPC_URL,
  GOERLI_RPC_URL,
  KOVAN_RPC_URL,
} = process.env;

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

task(
  "balance",
  "Prints an account's balance",
  async (args: any, hre: HardhatRuntimeEnvironment) => {
    //  const account = web3.utils.toChecksumAddress(args.account);
    const balance = await hre.ethers.provider.getBalance(args.account);

    console.log(hre.ethers.utils.formatEther(balance));
  }
).addParam("account", "The account's address");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: "0.8.0",
  namedAccounts: {
    deployer: 0,
    treasury: 1,
  },
  networks: {
    hardhat: {
      accounts: { mnemonic: MNEMONIC },
    },
    mainnet: {
      url:
        MAINNET_RPC_URL ||
        `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: { mnemonic: MNEMONIC },
    },
    ropsten: {
      url:
        ROPSTEN_RPC_URL ||
        `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: { mnemonic: MNEMONIC },
    },
    rinkeby: {
      url:
        RINKEBY_RPC_URL ||
        `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: { mnemonic: MNEMONIC },
    },
    goerli: {
      url:
        GOERLI_RPC_URL || `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: { mnemonic: MNEMONIC },
    },
    kovan: {
      url: KOVAN_RPC_URL || `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: { mnemonic: MNEMONIC },
    },
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: { mnemonic: MNEMONIC },
    },
  },
};
export default config;
