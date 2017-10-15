import { connect } from "react-redux";
import CampaignList from "./CampaignList";
import {
  loadAllCampaigns,
  deposit,
  withdraw,
  getIntoCampaign
} from "./CampaignListActions";

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.campaigns.items,
    isMarketplace: ownProps.isMarketplace
  };
};

const mapDispatchToProps = {
  loadAllCampaigns,
  withdraw,
  deposit,
  getIntoCampaign
};

const CampaignListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CampaignList
);

export default CampaignListContainer;
