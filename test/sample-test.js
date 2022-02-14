const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HC Events", function () {

  before(async function(){
    [this.contrato, this.person_one, this.person_two] = await hre.ethers.getSigners();
    const HCEvent = await ethers.getContractFactory("HCEvent");
    this.contract = await HCEvent.deploy();
    await this.contract.deployed();

    this.c_one = await this.contract.connect(this.person_one);
    this.c_two = await this.contract.connect(this.person_two);
  })

  it("Mint events", async function () {
    await this.contract.mintEvent(this.person_one.address, 1, 1, "https://ipfs.io/ipfs/QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7");
    await this.contract.mintEvent(this.person_one.address, 1, 1, "https://ipfs.io/ipfs/QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7");
    await this.contract.mintEvent(this.person_one.address, 1, 1, "https://ipfs.io/ipfs/QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7");
    await this.contract.mintEvent(this.person_two.address, 2, 1, "https://ipfs.io/ipfs/QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7");

    let evento = await this.c_one.getEvent(this.person_one.address, 2);
    
    let evento2 = await this.c_two.getEvent(this.person_two.address, 3);
    console.log(evento2)
  });
});
