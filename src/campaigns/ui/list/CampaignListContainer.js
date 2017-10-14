import { connect } from "react-redux";
import CampaignList from "./CampaignList";
import { loadAllCampaigns } from "./CampaignListActions";

const mapStateToProps = (state, ownProps) => {
  console.log(state.campaigns.items);
  return {
    items: state.campaigns.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllCampaigns: () => {
      dispatch(loadAllCampaigns());
    }
  };
};

const CampaignListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CampaignList
);

export default CampaignListContainer;
