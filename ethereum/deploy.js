const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CrowdfundFactory.json");

const provider = new HDWalletProvider(
  "random burger glory spray scrub crawl vehicle acid scene bunker frequent census",
  "https://rinkeby.infura.io/ceyaY8an9OAyJdo4An7R"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account ", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode, arguments: ["1"] })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed to ", result.options.address);
};
deploy();
