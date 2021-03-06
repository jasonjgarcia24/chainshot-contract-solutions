require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
const Web3Wallet = require('./utils/Web3Wallet');
const { RPC_PROVIDER, NETWORK, RPC_PORT } = require('./utils/config');

// Get private key
const web3Wallet = new Web3Wallet({
  mnemonic: process.env.MNEMONIC,
  rpcProvider: RPC_PROVIDER,
  network: NETWORK,
  numberOfWallets: 1,
});

const privateKey = web3Wallet.bip44Wallet[0][0].privateKey;

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      accounts: {
        count: 1000
      }
    },
    localhost: {
      url: `http://127.0.0.1:${RPC_PORT.GANACHE}`,
    },
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_URL,
      accounts: [privateKey],
    },
    kovan: {
      url: process.env.ALCHEMY_KOVAN_URL,
      accounts: [privateKey],
    }
  }
};
