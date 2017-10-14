import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "grommet/components/Button";
import RootActions from "../../redux/RootRedux";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  // async componentWillMount() {
  //   const { web3 } = this.props;
  //   const SmartAdContract = contract(SmartAd);
  //   SmartAdContract.setProvider(web3.currentProvider);
  //   const inst = await SmartAdContract.at(
  //     "0xc399ec88f52fdc8af778872082aa305969bca3d4"
  //   );
  //   this.setState({ contract: inst });
  // }

  // contribute = async () => {
  //   const { contract } = this.state;
  //   const result = await contract.initializeCampaign({ value: 1 });
  // };

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <Button
              onClick={() => this.props.initializeCampaign("TEST")}
              label="Contribute"
            />
            <p>
              <strong>Congratulations {this.props.authData.name}!</strong> If
              you're seeing this page, you've logged in with your own smart
              contract successfully.
            </p>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ web3 }) => {
  return { web3: web3.web3Instance };
};

const mapDispatchToProps = dispatch => ({
  initializeCampaign: name => dispatch(RootActions.initializeCampaign(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
