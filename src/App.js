import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import RootActions from "./redux/RootRedux";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./util/wrappers.js";

// UI Components
import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    startup: PropTypes.func
  };

  componentWillMount() {
    this.props.startup();
  }

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">
            Dashboard
          </Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">
            Profile
          </Link>
        </li>
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
            Truffle Box
          </Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.root.web3Loading
});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(RootActions.startup())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
