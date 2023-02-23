const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

async function main() {
  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await hre.ethers.getSigners();
  const ERC20 = await hre.ethers.getContractFactory("MockERC20");
  const Swap = await hre.ethers.getContractFactory("SwapT");
  const swap = await Swap.deploy();
  const myERC20 = await ERC20.deploy("Test", "TST");
  await myERC20.deployed();
  const myERC20Address = myERC20.address;
  const swapAddress = swap.address;
  console.log("Swap deployed to:" + swap.address);
  console.log("ERC20 deployed to:" + myERC20.address);
  ///test mint function
  await owner.mint(owner.address, 1000);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
