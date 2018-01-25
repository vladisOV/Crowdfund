import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //browser + metamask exists
  web3 = new Web3(window.web3.currentProvider);
} else {
  //serverside
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/ceyaY8an9OAyJdo4An7R"
  );
  web3 = new Web3(provider);
}

export default web3;
