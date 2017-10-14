import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";

import "grommet/scss/vanilla/index.scss";

import getWeb3 from "./util/web3/getWeb3";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./util/wrappers.js";

// Layouts
import App from "./App";
import Home from "./layouts/home/Home";
import Dashboard from "./layouts/dashboard/Dashboard";
import SignUp from "./user/layouts/signup/SignUp";
import Profile from "./user/layouts/profile/Profile";

// Redux Store
import createStore from "./redux/createStore";
const store = createStore();
// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);
getWeb3
  .then(results => {
    console.log("Web3 initialized!");
  })
  .catch(() => {
    console.log("Error in web3 initialization.");
  });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
