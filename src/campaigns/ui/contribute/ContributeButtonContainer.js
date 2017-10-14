import { connect } from "react-redux";
import ContributeButton from "./ContributeButton";
import { initializeCampaign } from "./ContributeButtonActions";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: payload => {
      dispatch(initializeCampaign(payload));
    }
  };
};

const ContributeButtonContainer = connect(mapStateToProps, mapDispatchToProps)(
  ContributeButton
);

export default ContributeButtonContainer;
