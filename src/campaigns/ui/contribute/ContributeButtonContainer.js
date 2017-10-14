import { connect } from "react-redux";
import ContributeForm from "./ContributeForm";
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
  ContributeForm
);

export default ContributeButtonContainer;
