import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import "./styles_main/global.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import rootReducer from "./store/reducers";
import createSagaMiddleware from "redux-saga";
import { watchUser, watchSearch } from "./store/sagas";
import { saveToLocalStorage, loadState } from "./util";

const styleNode = document.createComment("insertion-point-jss");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* SAGA STUFF */
const sagaMiddleware = createSagaMiddleware();

// REDUX STUFF
let persistedState = loadState(); // retreives local storage

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(promiseMiddleware, sagaMiddleware))
);

store.subscribe(() => {
  saveToLocalStorage(store.getState()); // save current state to localstorage.
});

window.onbeforeunload = () => {
  saveToLocalStorage(store.getState()); // save current state to localstorage.
};

sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchSearch);

const app = (
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JssProvider>
  </Provider>
);

const root = document.getElementById("root");
if (root != null) {
  ReactDOM.render(app, root);
  registerServiceWorker();
}
