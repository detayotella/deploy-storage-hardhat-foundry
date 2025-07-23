import { ethers } from "hardhat";

async function main() {
  console.log("Starting Storage contract deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

  // Get the contract factory
  const Storage = await ethers.getContractFactory("Storage");

  console.log("Deploying Storage contract...");

  // Deploy the contract with explicit gas settings
  const storage = await Storage.deploy({
    gasLimit: 1000000, // 1M gas limit
    maxFeePerGas: ethers.parseUnits("30", "gwei"), // 30 gwei max fee
    maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"), // 2 gwei priority fee
  });

  console.log("Waiting for deployment confirmation...");
  
  // Wait for the contract to be deployed
  await storage.waitForDeployment();

  const contractAddress = await storage.getAddress();
  
  console.log("Storage contract deployed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("Transaction hash:", storage.deploymentTransaction()?.hash);
  console.log("Block number:", storage.deploymentTransaction()?.blockNumber);
  
  // Verify the contract was deployed correctly
  const deployedCode = await deployer.provider.getCode(contractAddress);
  if (deployedCode === "0x") {
    console.log("Contract deployment failed - no bytecode found!");
    process.exit(1);
  } else {
    console.log("Contract bytecode verified on-chain");
  }

  console.log("\nDeployment Summary:");
  console.log("Network:", (await deployer.provider.getNetwork()).name || "CoreDAO Testnet");
  console.log("Chain ID:", (await deployer.provider.getNetwork()).chainId);
  console.log("Contract Address:", contractAddress);
  console.log("Deployer:", deployer.address);
}

main()
  .then(() => {
    console.log("\n🎉 Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });