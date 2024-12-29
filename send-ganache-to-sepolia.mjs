import Web3 from 'web3';

// Ganache network and Sepolia network setup
const ganacheWeb3 = new Web3('http://127.0.0.1:7545'); // Local Ganache
const sepoliaWeb3 = new Web3(
  new Web3.providers.HttpProvider('YOUR_INFURA_URL')
);

// Ganache account details
const senderAddress = 'Ganache account';
const privateKey = 'privateKey';

// Sepolia receiver address
const receiverAddress = 'Sepolia receiver address';

// Amount to send (in Ether)
const amountInEther = '.01';
const valueInWei = ganacheWeb3.utils.toWei(amountInEther, 'ether');

// Hardcoded gas values
const gasLimit = 21000; // Standard gas limit for a simple ETH transfer
const maxPriorityFeePerGas = 100000000; // Priority fee (in wei)

async function getGanacheBalance() {
  const balance = await ganacheWeb3.eth.getBalance(senderAddress);
  console.log(
    `Ganache Balance: ${ganacheWeb3.utils.fromWei(balance, 'ether')} ETH`
  );

  return balance;
}

// Send Ether function
async function sendEtherToSepolia() {
  try {
    const balance = await getGanacheBalance();

    // Fetch the latest block to get the current base fee from Sepolia
    const block = await sepoliaWeb3.eth.getBlock('latest');
    const baseFeePerGas = BigInt(block.baseFeePerGas); // Base fee for the block

    console.log('baseFeePerGas', block.baseFeePerGas);

    // Set maxFeePerGas to be at least baseFeePerGas + a buffer
    const maxFeePerGas = baseFeePerGas + BigInt(5000000000); // Adding a 5 Gwei buffer

    console.log('maxFeePerGas', maxFeePerGas);

    // Check if sender has enough balance (ETH + gas fees)
    const totalGasCostInWei = BigInt(gasLimit) * maxFeePerGas;
    const totalCostInWei = BigInt(valueInWei) + totalGasCostInWei;

    console.log('BigInt(balance)', BigInt(balance));
    console.log('totalCostInWei', totalCostInWei);

    if (BigInt(balance) < totalCostInWei) {
      console.log('Insufficient funds for transaction (value + gas fees)');
      return;
    }

    console.log('Passed funds for transaction');

    // Prepare the transaction for signing (with Ganache Web3)
    const transaction = {
      from: senderAddress,
      to: receiverAddress,
      value: valueInWei,
      gas: gasLimit, // Standard gas limit for a simple ETH transfer
      chainId: 11155111, // Sepolia chainId for sending
      maxFeePerGas: maxFeePerGas.toString(), // Dynamically set maxFeePerGas
      maxPriorityFeePerGas: '100000000', // 1 Gwei priority fee
    };

    console.log('Transaction:', transaction);

    // Sign the transaction using Ganache Web3
    const signedTransaction = await ganacheWeb3.eth.accounts.signTransaction(
      transaction,
      privateKey
    );

    console.log('signedTransaction:', signedTransaction);

    // Send the signed transaction to Sepolia
    const receipt = await sepoliaWeb3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log('Transaction successful:', receipt);
  } catch (error) {
    console.log('Error in transaction:', error);
  }
}

// Call the function to send Ether
sendEtherToSepolia();
