import SmartAd from "../../../../build/contracts/SmartAd.json";
import store from "../../../store";

const contract = require("truffle-contract");

const campaignStructureFormatters = [
  val => ({ attr: "id", value: val.toNumber() }),
  val => ({ attr: "active", value: val }),
  val => ({ attr: "name", value: val }),
  (val, web3) => ({ attr: "balance", value: web3.fromWei(val).toString() })
];

export const CAMPAIGN_SETTED = "CAMPAIGN_SETTED";
function setCampaigns(campaigns) {
  return {
    type: CAMPAIGN_SETTED,
    payload: campaigns
  };
}

export function loadAllCampaigns() {
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
        const count = await smartAdInstance.getAllCampaings({
          from: coinbase
        });
        const campaignsPromises = await [...Array(count.toNumber()).keys()]
          .reverse()
          .map(async id => {
            const res = await smartAdInstance.getCampaign(id);
            return res.reduce((prev, cur, i) => {
              const { attr, value } = campaignStructureFormatters[i](cur, web3);
              prev[attr] = value;
              return prev;
            }, {});
          });
        const campaigns = await Promise.all(campaignsPromises);
        dispatch(setCampaigns(campaigns));
      });
    };
  } else {
    console.error("Web3 is not initialized.");
  }
}
