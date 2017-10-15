import { connect } from "react-redux";
import CampaignList from "./CampaignList";
import { loadAllCampaigns, deposit, withdraw } from "./CampaignListActions";
import { getAdvertiserPayout } from "../contribute/ContributeFormActions";

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.campaigns.items
  };
};

const mapDispatchToProps = {
  loadAllCampaigns,
  withdraw,
  deposit,
  getAdvertiserPayout
};

const CampaignListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CampaignList
);

export default CampaignListContainer;
