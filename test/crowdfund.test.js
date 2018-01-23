const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require("../compile.js");

let crowdfund;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  crowdfund = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["1"] })
    .send({ from: accounts[0], gas: "1000000" });
  crowdfund.setProvider(provider);
});

describe("Crowdfund contract", () => {
  it("deploys a contract", () => {
    assert.ok(crowdfund.options.address);
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
      .call({
        from: accounts[0]
      });
    assert.equal(1, count);
    assert.equal(true, approverExists);
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
    assert.equal(true, request.complete);
  });
});
