import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import initReducer from "./stores/index";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(initReducer);
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
