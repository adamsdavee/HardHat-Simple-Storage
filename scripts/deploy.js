// imports

const { ethers, getNamedAccounts, run, network } /*hre*/ = require("hardhat");

// async main
async function main() {
  console.log("Welcome!");
  const accounts = await ethers.getSigners();
  console.log("Okay...");
  const accountZero = accounts[0];
  console.log("still pushing...");
  const { deployer } = await getNamedAccounts();
  console.log("I guess it broke here!");
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  // const contract = await hre.ethers.deployContract("SimpleStorage");
  const contract = await SimpleStorageFactory.deploy();
  console.log("still waiting....");
  await contract.waitForDeployment();

  console.log(`SimpleStorage Address: ${contract.target}`);
  console.log(accountZero);
  console.log(deployer);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await contract.deploymentTransaction().wait(2);
    console.log("It's Working!");
    await verify(contract.target, []);
  }

  // Get current value
  const currentValue = await contract.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update current value
  const transactionResponse = await contract.store(55);
  await transactionResponse.wait(1);
  const updatedValue = await contract.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);

  console.log(network.config.chainId);
}

// autoVerification function
async function verify(contractAddress, args) {
  console.log("Verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

// main
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
  });
