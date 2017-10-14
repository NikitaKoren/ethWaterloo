import React, { Component } from "react";
import Heading from "grommet/components/Heading";
import ContributeButtonContainer from "../../campaigns/ui/contribute/ContributeButtonContainer";
import CampaignListContainer from "../../campaigns/ui/list/CampaignListContainer";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Heading align="center">Dashboard</Heading>
            <ContributeButtonContainer />
          </div>
        </div>{" "}
        <CampaignListContainer />
      </main>
    );
  }
}

export default Dashboard;
