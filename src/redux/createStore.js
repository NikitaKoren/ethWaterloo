import { browserHistory } from "react-router";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware, routerReducer } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import { reducer as RootReducer } from "./RootRedux";
import userReducer from "../user/userReducer";
import web3Reducer from "../util/web3/web3Reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const routingMiddleware = routerMiddleware(browserHistory);

function configureStore(rootReducer, rootSaga) {
  // const sagaMonitor = Reactotron.createSagaMonitor()
  // const sagasMiddleware = createSagaMiddleware({sagaMonitor})
  const sagaMiddleware = createSagaMiddleware({});

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunkMiddleware, routingMiddleware, sagaMiddleware)
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

export default () => {
  const rootReducer = combineReducers({
    root: RootReducer,
    routing: routerReducer,
    user: userReducer,
    web3: web3Reducer
  });

  return configureStore(rootReducer, rootSaga);
};
