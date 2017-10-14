const initialState = {
  data: null,
  items: []
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CAMPAIGN_INITIALIZED":
      return { ...state, items: state.items.concat(action.payload) };
    case "CAMPAIGN_SETTED":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export default campaignReducer;
