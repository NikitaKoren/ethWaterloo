import SmartAd from "../../../../build/contracts/SmartAd.json";
import store from "../../../store";

const contract = require("truffle-contract");

export const CAMPAIGN_INITIALIZED = "CAMPAIGN_INITIALIZED";
function campaignInitialized(campaign) {
  return {
    type: CAMPAIGN_INITIALIZED,
    payload: campaign
  };
}

export function initializeCampaign(name = "") {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const smartAd = contract(SmartAd);
      smartAd.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var smartAdInstance;
      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        smartAd.deployed().then(function(instance) {
          smartAdInstance = instance;
          smartAdInstance
            .initializeCampaign(name, { from: coinbase, gas: 900000 })
            .then(function(result) {
              console.log(smartAdInstance, result);
              dispatch(campaignInitialized({ name }));
            });
        });
      });
    };
  } else {
    console.error("Web3 is not initialized.");
  }
}
