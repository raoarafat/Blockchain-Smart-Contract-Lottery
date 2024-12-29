const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');

const { abi, evm } = require('./compile');

// Replace 'YOUR_MNEMONIC' and 'YOUR_INFURA_URL' with your own values
provider = new HDWalletProvider('YOUR_MNEMONIC', 'YOUR_INFURA_URL');

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  web3.eth.getBalance(accounts[0]).then((balance) => {
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
  });

  console.log('Current gas price (in wei):', await web3.eth.getGasPrice());

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to:', result.options.address);

  console.log('interface', abi);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();
