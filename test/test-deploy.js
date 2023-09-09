const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favourite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    // assert keyword or expect keyword.
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue);
  });

  it(/*.only*/ "Should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should add a person's name and favourite number", async function () {
    console.log("Hi");
    const expectedName = "David";
    const expectedFavouriteNumber = "20";
    const transactionResponse = await simpleStorage.addPerson(
      expectedName,
      expectedFavouriteNumber
    );
    await transactionResponse.wait(1);
    console.log("Okay!");

    const currentPerson /* OR { favouriteNumber, name }*/ =
      await simpleStorage.people(0);
    console.log(currentPerson[0]);
    assert.equal(currentPerson[0].toString(), expectedFavouriteNumber);
    expect(currentPerson[1]).to.equal(expectedName);
  });
});
