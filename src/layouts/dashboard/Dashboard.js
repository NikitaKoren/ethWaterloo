import React, { Component } from "react";
import Heading from "grommet/components/Heading";
import Tabs from "grommet/components/Tabs";
import Tab from "grommet/components/Tab";
import ContributeFormContainer from "../../campaigns/ui/contribute/ContributeFormContainer";
import CampaignListContainer from "../../campaigns/ui/list/CampaignListContainer";
import CampaignListContainerPublisher from "../../campaigns/ui/listPublisher/CampaignListContainer";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    return (
      <main className="container">
        <Tabs>
          <Tab title="Advertiser">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <Heading align="center">Advertiser</Heading>
                <ContributeFormContainer />
              </div>
            </div>{" "}
            <CampaignListContainer showControls />
          </Tab>
          <Tab title="Publisher">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <Heading align="center">Publisher</Heading>
              </div>
            </div>{" "}
            <CampaignListContainerPublisher />
          </Tab>
        </Tabs>
      </main>
    );
  }
}

export default Dashboard;
