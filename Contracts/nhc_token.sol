// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NahidaToken is ERC20 {
    address public owner;
    uint public tokenPrice = 0.001 ether; // 1 NHC = 0.001 ETH
    uint public constant DECIMALS = 10**18; // ERC20 standard decimals

    constructor(uint initialSupply) ERC20("Nahida Coin", "NHC") {
        _mint(address(this), initialSupply * DECIMALS); // Mint with proper decimals
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    // 🔹 Buy Tokens (ETH → NHC)
    function buyTokens(uint tokenAmount) public payable {
        require(tokenAmount > 0, "Enter a valid token amount");

        uint tokenAmountWithDecimals = tokenAmount * DECIMALS; // Convert to 18 decimals
        uint totalCost = (tokenAmountWithDecimals * tokenPrice) / DECIMALS; // Adjust for price

        require(msg.value == totalCost, "Incorrect ETH amount sent");
        require(balanceOf(address(this)) >= tokenAmountWithDecimals, "Not enough tokens in contract");

        _transfer(address(this), msg.sender, tokenAmountWithDecimals);
    }

    // 🔹 Sell Tokens (NHC → ETH)
    function sellTokens(uint tokenAmount) public {
        uint tokenAmountWithDecimals = tokenAmount * DECIMALS; // Convert to 18 decimals
        require(balanceOf(msg.sender) >= tokenAmountWithDecimals, "Not enough tokens to sell");

        uint ethAmount = (tokenAmountWithDecimals * tokenPrice) / DECIMALS; // Adjust ETH calculation
        require(address(this).balance >= ethAmount, "Contract doesn't have enough ETH");

        _transfer(msg.sender, address(this), tokenAmountWithDecimals);
        payable(msg.sender).transfer(ethAmount);
    }

    // 🔹 Withdraw ETH (Owner Only)
    function withdrawETH() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // 🔹 Allow Contract to Receive ETH
    receive() external payable {}
}
