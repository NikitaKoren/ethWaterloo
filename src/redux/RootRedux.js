import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  // User & system actions
  startup: null,

  // Reducer actions
  setWeb3Loading: ["loading"],
  setAddress: ["address"],
  setBalance: ["balance"],
  setStores: ["stores"],
  initializeCampaign: ["name"]
});

export const RootTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  web3Loading: false,
  address: null,
  balance: 0,
  campaigns: []
});

export const setWeb3Loading = (state, { loading }) =>
  state.merge({ web3Loading: loading });
export const setAddress = (state, { address }) => state.merge({ address });
export const setBalance = (state, { balance }) => state.merge({ balance });
export const initializeCampaign = (state, { name }) => {
  console.log(name);
  return state.merge(state.campaigns, name);
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_WEB3_LOADING]: setWeb3Loading,
  [Types.SET_ADDRESS]: setAddress,
  [Types.SET_BALANCE]: setBalance,
  [Types.INITIALIZE_CAMPAIGN]: initializeCampaign
});
