import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import User from './Features/User'
import Cart from './Features/Cart'
import Order from './Features/Order'
import AllOrders from './Features/AllOrders';
import Produts from './Features/Products';
import { fetchUser } from './Features/User';
import {fetchProduts} from './Features/Products'

const store = configureStore({
  reducer: {
    user: User,
    cart: Cart,
    order: Order,
    products: Produts,
    allorders: AllOrders,
  }
})
store.dispatch(fetchUser())
store.dispatch(fetchProduts())
ReactDOM.render(
  
    <Provider store={store}>
    <App />
    </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
