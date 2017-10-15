import { connect } from "react-redux";
import CampaignList from "./CampaignList";
import { loadAllCampaigns, deposit, withdraw } from "./CampaignListActions";

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.campaigns.items
  };
};

const mapDispatchToProps = {
  loadAllCampaigns,
  withdraw,
  deposit
};

const CampaignListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CampaignList
);

export default CampaignListContainer;
