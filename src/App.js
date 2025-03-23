import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ethers } from "ethers"
const { utils } = ethers;

const TOKEN_ADDRESS = "0x174150bcC799D439c03d4e888A65628931ddb6b6";
const TOKEN_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "sellTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DECIMALS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function App() {
	const [account, setAccount] = useState(null);
	const [web3, setWeb3] = useState(null);
	const [token, setToken] = useState(null);
	const [tokenBalance, setTokenBalance] = useState("0");
	const [ethBalance, setEthBalance] = useState("0");
	const [amount, setAmount] = useState("");

	async function connectWallet() {
		try {
			const providerOptions = {};
			const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
			const instance = await web3Modal.connect();
			const web3Instance = new Web3(instance);
			setWeb3(web3Instance);

			const accounts = await web3Instance.eth.getAccounts();
			setAccount(accounts[0]);

			const tokenContract = new web3Instance.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
			setToken(tokenContract);
			console.log("Token Contract Loaded:", tokenContract);

			updateBalances(accounts[0], web3Instance, tokenContract);
		} catch (error) {
			console.error("Wallet connection failed:", error);
		}
	}

	async function updateBalances(account, web3Instance, tokenContract) {
		try {
			if (!tokenContract) return;
			const ethBal = await web3Instance.eth.getBalance(account);
			setEthBalance(web3Instance.utils.fromWei(ethBal, "ether"));

			const tokenBal = await tokenContract.methods.balanceOf(account).call();
			setTokenBalance(web3Instance.utils.fromWei(tokenBal.toString(), "ether"));
		} catch (error) {
			console.error("Failed to fetch balances:", error);
		}
	}

	async function buyTokens() {
		if (!token || !web3) return;
		try {
			const tokenAmount = utils.parseUnits(amount, 0); // Convert user input to BigInt
			const totalCost = utils.parseUnits((amount * 0.001).toString(), "ether"); // 1 token = 0.001 ETH
	
			await token.methods.buyTokens(tokenAmount.toString()).send({
				from: account,
				value: totalCost.toString(),
				gas: 500000
			});
	
			updateBalances(account, web3, token);
		} catch (error) {
			console.error("Buy transaction failed:", error);
		}
	}
	
	
	  
	  
	  





	async function sellTokens() {
		if (!token || !web3) return;
		try {
			const tokenAmount = utils.parseUnits(amount, 0); // Convert user input to BigInt
	
			// Approve the contract to spend tokens before selling
			await token.methods.approve(token.options.address, tokenAmount.toString()).send({
				from: account,
				gas: 100000
			});
	
			await token.methods.sellTokens(tokenAmount.toString()).send({
				from: account,
				gas: 500000
			});
	
			updateBalances(account, web3, token);
		} catch (error) {
			console.error("Sell transaction failed:", error);
		}
	}
	
	  
	
	
	

	async function withdrawETH() {
		if (!token || !web3) return;
		try {
			await token.methods.withdrawETH().send({ from: account });
			updateBalances(account, web3, token);
		} catch (error) {
			console.error("Withdraw failed:", error);
		}
	}

	return (
		<div className="container mt-5 text-light bg-dark p-4 rounded shadow-lg">
			<nav className="navbar navbar-dark bg-secondary p-3 mb-4 rounded">
				<span className="navbar-brand">Nahida Token Exchange</span>
				{account ? (
					<span>Connected: {account}</span>
				) : (
					<button className="btn btn-outline-light" onClick={connectWallet}>
						Connect Wallet
					</button>
				)}
			</nav>
			<div className="card bg-secondary p-4 text-white shadow">
				{account && (
					<>
						<p><strong>ETH Balance:</strong> {ethBalance} ETH</p>
						<p><strong>Nahida Token Balance:</strong> {tokenBalance} NHC</p>
						<input
							type="text"
							className="form-control mb-3"
							placeholder="Enter token amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<button className="btn btn-success w-100 mb-2" onClick={() => buyTokens()}>
							Buy Nahida Tokens
						</button>

						<button className="btn btn-danger w-100 mb-2" onClick={sellTokens}>
							Sell Nahida Tokens
						</button>
						<button className="btn btn-warning w-100" onClick={withdrawETH}>
							Withdraw ETH (Owner Only)
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default App;