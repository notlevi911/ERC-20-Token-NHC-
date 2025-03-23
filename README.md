# ERC-20 Token NHC - Nahida Coin

## Overview
This project is a decentralized exchange (DEX) for trading an ERC-20 token called Nahida Coin (NHC). The smart contract is built using Solidity, and the frontend is developed with React and Web3.js. Users can buy and sell NHC tokens using ETH.

## Features
- **Buy NHC Tokens:** Purchase NHC tokens at a fixed rate of 0.001 ETH per token.
- **Sell NHC Tokens:** Sell NHC tokens back in exchange for ETH.
- **Withdraw ETH:** The contract owner can withdraw accumulated ETH.
- **Connect Wallet:** Users can connect their MetaMask wallet to interact with the platform.

## Technologies Used
- Solidity (Smart Contracts)
- OpenZeppelin ERC-20 Implementation
- React (Frontend)
- Bootstrap (Styling)
- Web3.js (Ethereum Interaction)

## Demo
[![Demo Video](https://img.youtube.com/vi/https://youtu.be/iiRc0pbCUeA/0.jpg)](https://www.youtube.com/watch?v=https://youtu.be/iiRc0pbCUeA)



## Setup Instructions
### 1. Smart Contract Deployment (Remix)
1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create two Solidity files:
   - `NahidaToken.sol` (ERC-20 Token Contract)
3. Compile the contracts and deploy them using Injected Web3 (MetaMask).

### 2. Frontend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/notlevi911/ERC-20-Token-NHC-.git
   cd ERC-20-Token-NHC-
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Usage
- **Connect Wallet:** Click the 'Connect Wallet' button to link your MetaMask.
- **Buy Tokens:** Enter the amount of NHC tokens and click 'Buy Nahida Tokens'.
- **Sell Tokens:** Enter the amount of NHC tokens and click 'Sell Nahida Tokens'.
- **Withdraw ETH:** If you are the contract owner, click 'Withdraw ETH' to collect earnings.

## Contributing
Feel free to fork the repo and submit pull requests!

## License
This project is licensed under the MIT License.

