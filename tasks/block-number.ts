// get the current block number on whatever blockchain we work with
import { task } from "hardhat/config" 

export default task("block-number", "Prints the current block number").setAction(
    // const blockTask = async function() => {}
    // async function blockTask() {}
    async (taskArgs, hre) => {
        // hre: Hardhat Runtime Environment == require("hardhat/config")
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    } // Difference: without giving this function a name; Anonymous Function
)

