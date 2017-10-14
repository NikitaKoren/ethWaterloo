const initialState = {
  web3Instance: null
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === "WEB3_INITIALIZED") {
    window.web3 = action.payload.web3Instance;
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance
    });
  }

  return state;
};

export default web3Reducer;
