// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.mnemonic,
  process.env.infuraEndpoint
);
const web3 = new Web3(provider);

const deploy = async () => {
  const [from] = await web3.eth.getAccounts();
  console.log(`attempting to deploy from account: ${from}`);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['initial message'] })
    .send({ gas: '1000000', from });
  console.log(`contract deployed to ${result.options.address}`);
  provider.engine.stop();
};

deploy();

/**
 * (async () => {
        const [from] = await web3.eth.getAccounts();
        console.log(`attempting to deploy from account: ${from}`);

        const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data, arguments: ['initial message'] })
            .send({ gas: '1000000', from })
        console.log(`contract deployed to ${result.options.address}`);
        provider.engine.stop();
    })();
 */
