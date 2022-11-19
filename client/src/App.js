import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/Checkout";
import Orders from "./pages/Orders";
import PageNotFount from "./pages/PageNotFount";
import Product from "./pages/Product";
import Feedback from "./pages/Feedback";
import Order from "./pages/Order";
import Test from "./pages/Test";

import Headers from "./components/NavBar";

function App() {
  const user = useSelector((state) => state.user.userInfo?.isAuth);
  return (
    <div className="container">
      <Router>
        <Headers  />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/shop/:id" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/checkout" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="*" element={<PageNotFount />} />
            <Route path="/test" element={<Test />} />
          </Routes>{" "}
        </div>
      </Router>
    </div>
  );
}

export default App;
