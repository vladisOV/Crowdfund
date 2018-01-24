const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require("../ethereum/build/CrowdfundFactory.json");
const compiledCrowdfund = require("../ethereum/build/Crowdfund.json");

let factory;
let accounts;
let crowdfund;
let crowdfundAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode, arguments: ["1"] })
    .send({ from: accounts[0], gas: "1000000" });
  factory.setProvider(provider);
  await factory.methods.createCrowdfund("100").send({
    from: accounts[0],
    gas: "1000000"
  });
  //get first element and assign to crowdfundAddress
  [crowdfundAddress] = await factory.methods.getDeployedCrowdfunds().call();
  crowdfund = await new web3.eth.Contract(
    JSON.parse(compiledCrowdfund.interface),
    crowdfundAddress
  );
});

describe("Crowdfund contract", () => {
  it("deploys a contract", () => {
    assert.ok(crowdfund.options.address);
    assert.ok(factory.options.address);
  });
  it("marks caller as the camp manager", async () => {
    const manager = await crowdfund.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  it("can contribute", async () => {
    const contributorAddress = accounts[1];
    await crowdfund.methods.contribute().send({
      from: contributorAddress,
      value: web3.utils.toWei("2", "ether")
    });
    const count = await crowdfund.methods.approversCount().call({
      from: accounts[0]
    });
    const approverExists = await crowdfund.methods
      .approvers(contributorAddress)
      .call();
    assert.equal(1, count);
    assert(approverExists);
  });
  it("requires min contribution", async () => {
    try {
      await crowdfund.methods.contribute().send({
        value: "5",
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it("creating request", async () => {
    await crowdfund.methods.createRequest("some desc", 1, accounts[1]).send({
      from: accounts[0],
      gas: "1000000"
    });
    const request = await crowdfund.methods.requests(0).call();
    assert.equal(accounts[1], request.recipient);
  });
  it("approving request", async () => {
    const contributorAddress = accounts[1];
    const recipientAddress = accounts[2];
    await crowdfund.methods.contribute().send({
      from: contributorAddress,
      value: web3.utils.toWei("2", "ether")
    });
    await crowdfund.methods
      .createRequest("some desc", 1, recipientAddress)
      .send({
        from: accounts[0],
        gas: "1000000"
      });
    await crowdfund.methods.approveRequest(0).send({
      from: contributorAddress
    });
    const request = await crowdfund.methods.requests(0).call();
    assert.equal(1, request.approvalCount);
  });
  it("finalizing request", async () => {
    const contributorAddress = accounts[1];
    const recipientAddress = accounts[2];
    await crowdfund.methods.contribute().send({
      from: contributorAddress,
      value: web3.utils.toWei("2", "ether")
    });
    await crowdfund.methods
      .createRequest("some desc", 1, recipientAddress)
      .send({
        from: accounts[0],
        gas: "1000000"
      });
    await crowdfund.methods.approveRequest(0).send({
      from: contributorAddress
    });
    await crowdfund.methods.finalizeRequest(0).send({
      from: accounts[0]
    });
    const request = await crowdfund.methods.requests(0).call();
    let balance = await web3.eth.getBalance(recipientAddress);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 99);
    assert.equal(true, request.complete);
  });
});
