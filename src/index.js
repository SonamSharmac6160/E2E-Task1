import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from "./reducers";

function saveToLocalStorage (state) {
  try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
  } catch (e) {
      return e;
  }
}

function loadFromLocalStorage () {
  try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
          return undefined;
      }
      return JSON.parse(serializedState);
  } catch (e) {
      return e;
  }
}

const persistedState = loadFromLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(reduxThunk)));
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();