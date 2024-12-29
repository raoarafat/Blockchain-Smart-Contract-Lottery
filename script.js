import Web3 from 'web3'; // For ES6 module style
const web3 = new Web3('http://127.0.0.1:7545'); // Ganache local network

// Replace with the sender address (Ganache account)
const senderAddress = 'Ganache account';

// Replace with your MetaMask address on the Sepolia network (or any public testnet)
const receiverAddress = 'MetaMask address';

// Amount of Ether to send (in Ether)
const amountInEther = '1'; // Amount of Ether you want to send

// Send transaction
web3.eth
  .sendTransaction({
    from: senderAddress,
    to: receiverAddress,
    value: web3.utils.toWei(amountInEther, 'ether'),
  })
  .then((receipt) => {
    console.log('Transaction successful:', receipt);
  })
  .catch((error) => {
    console.log('Error in transaction:', error);
  });
