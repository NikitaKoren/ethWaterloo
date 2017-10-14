import React, { Component } from "react";
import { Link } from "react-router";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./util/wrappers.js";

// UI Components
import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

import "../node_modules/grommet-css";

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
      <span>
        <LogoutButtonContainer />
      </span>
    ));

    const OnlyGuestLinks = HiddenOnlyAuth(() => (
      <span>
        <li className="pure-menu-item">
          <Link to="/signup" className="pure-menu-link">
            Sign Up
          </Link>
        </li>
        <LoginButtonContainer />
      </span>
    ));

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
          <Link to="/" className="pure-menu-heading pure-menu-link">
            SmartAd
          </Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App;
