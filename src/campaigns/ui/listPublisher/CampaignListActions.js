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
export const UPDATE_CAMPAIGN = "UPDATE_CAMPAIGN";

function setCampaigns(campaigns) {
  return {
    type: CAMPAIGN_SETTED,
    payload: campaigns
  };
}

function updateCampaign(campaign) {
  return {
    type: UPDATE_CAMPAIGN,
    payload: campaign
  };
}

export function withdraw(id, amount) {
  return async function(dispatch, getState) {
    const web3 = getState().web3.web3Instance;

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
      await smartAdInstance.withdrawCampaignFunds(
        id,
        web3.toWei(amount, "ether"),
        {
          from: coinbase
        }
      );
      const campaign = getState().campaigns.items.find(item => id === item.id);
      campaign.balance -= amount;
      dispatch(updateCampaign(campaign));
    });
  };
}

export function deposit(id, amount) {
  return async function(dispatch, getState) {
    const web3 = getState().web3.web3Instance;

    const smartAd = contract(SmartAd);
    smartAd.setProvider(web3.currentProvider);

    web3.eth.getCoinbase(async (error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }
      const smartAdInstance = await smartAd.deployed();
      console.log(web3.toWei(amount, "ether"));
      await smartAdInstance.addCampaignFunds(id, web3.toWei(amount, "ether"), {
        from: coinbase,
        value: web3.toWei(amount, "ether")
      });
      const campaign = getState().campaigns.items.find(item => id === item.id);
      let balance = +campaign.balance;
      balance += +amount;
      campaign.balance = balance;
      dispatch(updateCampaign(campaign));
    });
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
        const ids = await smartAdInstance.getPublisherInvolvedCampaings({
          from: coinbase
        });
        const campaignsPromises = await ids.reverse().map(async id => {
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
