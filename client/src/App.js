import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";

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
import Order from "./pages/Order";
import SidePopUpMessage from "./components/SidePopUpMessage";
import NavBar from "./components/Navbar";

function App() {
  const isAuth = useSelector((state) => state.user.userInfo?.isAuth);
  const ProtectedRoute = ({ element, ...rest }) => {
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
  };
  const AuthRoute = ({ element, ...rest }) => {
    return isAuth ? <Navigate to="/" replace /> : <Outlet />;
  };

  return (
    <div className="container">
      <Router>
        <div className="main">
          {isAuth && <NavBar />}
          <SidePopUpMessage />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/shop/:id" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route element={<AuthRoute />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<PlaceOrder />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
