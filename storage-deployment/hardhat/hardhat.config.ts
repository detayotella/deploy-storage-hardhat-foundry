import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"; 

dotenv.config(); 

const { PRIVATE_KEY, SEPOLIA_RPC_URL, ETHERSCAN_KEY, COREDAO_RPC_URL, CORESCAN_API_KEY } = process.env; 

const config: HardhatUserConfig = {
  solidity: "0.8.30",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL, 
      accounts: [`0x${PRIVATE_KEY}`], 
      gas: "auto", 
      gasPrice: 20000000000,
      chainId: 11155111, 
    }, 
    coredao: {
      url: COREDAO_RPC_URL, 
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1114,
      gas: "auto",
      maxFeePerGas: 2_000_000_000,  
      maxPriorityFeePerGas: 1_000_000_000,
    } as any
  }, 
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_KEY || "",
      coredao: CORESCAN_API_KEY || ""

    }
    // customChains: [
    //   {
    //     network: "coredao", 
    //     chainId: 1114,
    //     urls: {
    //       apiURL: "https://explorer.testnet.coredao.org/api",  
    //       browserURL: "https://explorer.testnet.coredao.org"       
    //     }
    //   }
    // ]
  }
};

export default config;
