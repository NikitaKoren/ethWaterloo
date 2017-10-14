import React, { Component } from "react";
import ContributeButtonContainer from "../../campaigns/ui/contribute/ContributeButtonContainer";

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
            <h1>Dashboard</h1>
            <ContributeButtonContainer />
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

export default Dashboard;
