import web3 from "./web3";
import CrowdfundFactory from "./build/CrowdfundFactory";

const instance = new web3.eth.Contract(
  JSON.parse(CrowdfundFactory.interface),
  "0xB47056eff66d8CfC9c0763794FB05dCe3F848551"
);

export default instance;
