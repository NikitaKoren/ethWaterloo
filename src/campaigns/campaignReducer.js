const initialState = {
  data: null,
  items: []
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CAMPAIGN_INITIALIZED":
      return {
        ...state,
        items: state.items
          .reverse()
          .concat(action.payload)
          .reverse()
      };
    case "CAMPAIGN_SETTED":
      return { ...state, items: action.payload };
    case "UPDATE_CAMPAIGN":
      return {
        ...state,
        items: state.items.map(
          item => (item.id === action.payload.id ? action.payload : item)
        )
      };
    case "WOW":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default campaignReducer;
