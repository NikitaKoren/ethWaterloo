import contract from "truffle-contract";
import SmartAdJSON from "../../build/contracts/SmartAd.json";
import Web3 from "web3";

class Web3Service {
  constructor() {
    this.web3 = null;
    this.accounts = [];

    this.smartAd = contract(SmartAdJSON);
    this.smartAdInstance = null;
  }

  setProvider(provider) {
    this.web3 = new Web3(provider);
    this.smartAdInstance.setProvider(provider);

    const getAccounts = () =>
      new Promise((resolve, reject) => {
        this.web3.eth.getAccounts((error, accounts) => {
          if (error) reject(error);
          resolve(accounts);
        });
      });

    return getAccounts()
      .then(accounts => {
        this.accounts = accounts;
        return this.smartAdInstance.deployed();
      })
      .then(smartAdInstance => (this.smartAdInstance = smartAdInstance));
  }
}

export default new Web3Service();
