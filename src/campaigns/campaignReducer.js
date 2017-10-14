const initialState = {
  data: null
};

const campaignReducer = (state = initialState, action) => {
  if (action.type === "CAMPAIGN_INITIALIZED") {
    return { ...state, data: action.payload };
  }

  return state;
};

export default campaignReducer;
