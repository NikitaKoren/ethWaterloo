import { browserHistory } from "react-router";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import reducer from "./reducer";

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};
const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware))
);
export default store;
