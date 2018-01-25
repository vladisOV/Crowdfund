import web3 from "./web3";
import CrowdfundFactory from "./build/CrowdfundFactory";

const instance = new web3.eth.Contract(
  JSON.parse(CrowdfundFactory.interface),
  "0x8B7f4A986e7A976e7738a4b045e502f0DB3bC803"
);

export default instance;
