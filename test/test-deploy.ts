// test code locally
// basic tast for SimplestorageContract

import { ethers } from "hardhat"
import { expect, assert } from "chai"
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types"


// Hardhat testing works with MOCHA framework based JavaScript;
// test can run directly in solidity too
// Use modern programming language like Javascript have more flexibility to do more stuuf to interact and test you smart contract
// Most projects tests in modern programming language

// describe: is a key word recognised by Hardhat and MOCHA
// function testFunc(){}
// describe("SimpleStorage", testFunc)
describe("SimpleStorage", function () {
    // use anonymous func, best practice

    // let simpleStorageFactory, simpleStorage
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage

    // initializes these variables and get rid of the const keyeord since we assign them and they aren't constant now
    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
        // getContractFactory return ContractFactory not SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })
    // tell us what to do before each 'it'
    // before each one of our test "it", we gonna deploy our contract
    // so we have a brand new contract for each one test

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert: we use this keyword more
        // expect: in some scenarios we will need this keyword
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        // await new Promise((resolve) => setTimeout(resolve, 800)) // delay for the api call limit -> NO WORK
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    // it.only("Should update when we call store", async function () {
    //     const expectedValue = "7"
    //     const transactionResponse = await simpleStorage.store(expectedValue)
    //     await transactionResponse.wait(1)
    //     const currentValue = await simpleStorage.retrieve()
    //     assert.equal(currentValue.toString(), expectedValue)
    // }) // run this test only with keyword only

    it("Should update people when we add person", async function () {
        const peopleName = "Venus"
        const expectedValue = 8
        const transactionResponse = await simpleStorage.addPerson(
            peopleName,
            expectedValue
        )
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrievePeople(peopleName)
        assert.equal(expectedValue.toString(), currentValue.toString())
    })
    // describe("something", () => {
    //     beforeEach()
    //     it()
    //     it()
    //     it()
    // })
})

// // anonymous function synctax:
// describe("SimpleStorage", ()=>{})
