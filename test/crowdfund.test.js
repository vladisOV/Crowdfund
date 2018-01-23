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
});
