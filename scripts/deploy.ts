// imports
import { ethers, run, network } from "hardhat" 

// asyncfunction
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    ) 
    console.log("Deploying Contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deploy contract to: ${simpleStorage.address}`)

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...")
        await simpleStorage.deployTransaction.wait(6) // wait 6 blocks make sure our txn have done
        verify(simpleStorage.address, [])
    }

    // Interact with contracts
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is : ${currentValue}`)
    // Update current value
    const transactionResponse = await simpleStorage.store(8)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

// async function verify(contractAddress, args) {
// const verify = async (contractAddress: string, args: any[]) => {
const verify = async (contractAddress, args) => {
    // define a function without keyword function (more like define variable); having your function be a variable
    console.log("Verifying contract...")
    try {
        // the bite code may already be verified by etherscan, so we need try
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log("Verified!")
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(`Verify error: ${e}`)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
