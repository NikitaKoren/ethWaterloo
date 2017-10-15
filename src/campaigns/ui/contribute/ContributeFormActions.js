import SmartAd from "../../../../build/contracts/SmartAd.json";
import store from "../../../store";

const contract = require("truffle-contract");

const campaignStructureFormatters = [
  val => ({ attr: "id", value: val.toNumber() }),
  val => ({ attr: "active", value: val }),
  val => ({ attr: "name", value: val }),
  (val, web3) => ({ attr: "balance", value: web3.fromWei(val).toString() })
];

export const CAMPAIGN_INITIALIZED = "CAMPAIGN_INITIALIZED";
function campaignInitialized(campaign) {
  return {
    type: CAMPAIGN_INITIALIZED,
    payload: campaign
  };
}

export function initializeCampaign({ name = "", balance }) {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return function(dispatch, getState) {
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
            .initializeCampaign(name, web3.toWei(0.01, "ether"), {
              from: coinbase,
              value: web3.toWei(balance, "ether"),
              gas: 200000
            })
            .then(result => {
              dispatch(
                campaignInitialized({
                  name,
                  id: getState().campaigns.items.length,
                  balance,
                  active: true
                })
              );
              const newBalance = getState().user.data.balance - balance;
              console.log(newBalance);
              dispatch({
                type: "USER_UPDATED",
                payload: { balance: newBalance }
              });
            });
        });
      });
    };
  } else {
    console.error("Web3 is not initialized.");
  }
}

export function wonderfulAction({ id, address }) {
  let web3 = store.getState().web3.web3Instance;
  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return async function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const smartAd = contract(SmartAd);
      smartAd.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        const smartAdInstance = await smartAd.deployed();
        const involvedIds = await smartAdInstance.getPublisherInvolvedCampaings(
          coinbase
        );
        const ids = involvedIds.map(id => id.toString());
        console.log(id, ids);
        const found = ids.find(i => i === String(id));
        console.log(found);
        if (found) {
          const res = await smartAdInstance.getCampaign(id);
          console.log(res);
          const item = res.reduce((prev, cur, i) => {
            const { attr, value } = campaignStructureFormatters[i](cur, web3);
            prev[attr] = value;
            return prev;
          }, {});
          dispatch({ type: "WOW", payload: { item } });
        } else {
          alert("damn");
        }
      });
    };
  }
}

export function adClick({ id, address }) {
  let web3 = store.getState().web3.web3Instance;
  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return async function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const smartAd = contract(SmartAd);
      smartAd.setProvider(web3.currentProvider);
      const smartAdInstance = await smartAd.deployed();
      // Declaring this for later so we can chain functions on Authentication.
      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        console.log(smartAdInstance, coinbase, id);
        const resp = await smartAdInstance.adClick(+id, { from: address });
        console.log(resp);
      });
    };
  }
}

export function getAdvertiserPayout({ id }) {
  let web3 = store.getState().web3.web3Instance;
  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return async function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const smartAd = contract(SmartAd);
      smartAd.setProvider(web3.currentProvider);
      const smartAdInstance = await smartAd.deployed();
      // Declaring this for later so we can chain functions on Authentication.
      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        console.log(smartAdInstance, coinbase, id);
        const resp = await smartAdInstance.getAdvertiserPayout(+id, {
          from: coinbase
        });
        console.log(resp);
      });
    };
  }
}
