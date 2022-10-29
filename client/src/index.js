import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import User from "./features/user";
import Cart from "./features/cart";
import Order from "./features/order";
import AllOrders from "./features/allOrders";
import Produts from "./features/products";
import { fetchUser } from "./features/user";
import { fetchProduts } from "./features/products";

const store = configureStore({
  reducer: {
    user: User,
    cart: Cart,
    order: Order,
    products: Produts,
    allorders: AllOrders,
  },
});
store.dispatch(fetchUser());
store.dispatch(fetchProduts());
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
