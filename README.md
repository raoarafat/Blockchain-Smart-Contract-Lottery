# Lottery Smart Contract

This project contains a simple lottery smart contract deployed on Ethereum-based networks (Ganache, Sepolia). It allows users to participate in a lottery by sending Ether to the contract, and the contract randomly picks a winner who receives the total Ether balance.

## Contract Overview

### Lottery Contract

The Lottery contract has the following features:

- **Enter the Lottery**: Users can send a minimum of 0.0001 ETH to the contract to participate in the lottery.
- **Pick Winner**: The manager (deployer) can pick the winner who will receive all the Ether in the contract.
- **Random Winner Selection**: A pseudo-random winner is chosen based on block properties (e.g., `block.timestamp`, `block.prevrandao`).

### Functions

1. `enter`: Allows users to participate in the lottery by sending Ether to the contract.
2. `random`: Generates a pseudo-random number to select a winner.
3. `pickWinner`: Only the manager can call this function to pick the winner and reset the players.
4. `getPlayers`: Returns the list of current players in the lottery.

## Setup and Usage

### Prerequisites

- Node.js
- Web3.js
- Ganache (for local Ethereum network)
- Infura or another provider (for deploying to a public testnet like Sepolia)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/lottery-smart-contract.git
cd lottery-smart-contract
```

2. Install dependencies:

```bash
npm install
```

### Running the Tests

You can run the tests using Mocha to ensure the contract works as expected:

```bash
npm test
```

### Deploying the Contract

To deploy the contract to a public Ethereum network (e.g., Sepolia), you need to modify the following in the `deploy.js` script:

- **YOUR_MNEMONIC**: Your wallet mnemonic phrase.
- **YOUR_INFURA_URL**: Your Infura URL to connect to Ethereum networks.

Then run the deployment script:

```bash
node deploy.js
```

### Sending Ether from Ganache to Sepolia

This project also includes an example of sending Ether from a Ganache account to a Sepolia account using Web3.js.

Modify the `sendEtherToSepolia` function with your details:

- **senderAddress**: Your Ganache account address.
- **receiverAddress**: Your Sepolia testnet address.
- **privateKey**: Private key for signing transactions from the Ganache account.

Run the function to send Ether from Ganache to Sepolia:

```bash
node sendEther.js
```

## License

This project is licensed under the MIT License.
