/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import home from "./features/home";
import user from "./features/user";
import orders from "./features/orders";
import products from "./features/products";
import popUpMessage from "./features/popUpMessage";
import { fetchUser } from "./features/user";
import { fetchProduts } from "./features/products";
import { fetchCatgorys } from "./features/home";

const store = configureStore({
  reducer: {
    user,
    home,
    orders,
    products,
    popUpMessage,
  },
});
store.dispatch(fetchUser());
store.dispatch(fetchCatgorys());
// store.dispatch(fetchProduts());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
