import React, { Component } from "react";
import Heading from "grommet/components/Heading";

import CampaignListContainer from "../../campaigns/ui/list/CampaignListContainer";

class Dashboard extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Heading align="center">Marketplace</Heading>
            <CampaignListContainer isMarketplace />
          </div>
        </div>{" "}
      </main>
    );
  }
}

export default Dashboard;
