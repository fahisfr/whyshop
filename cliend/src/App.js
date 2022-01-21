import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";


import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from './Features/User'

import Home from './Page/Home/Home'
import UpdateTap from './AdminPage/Update-Tap/Update-Tap';
import AddProduct from './AdminPage/AddProduct/AddProduct';
import Shop from './Page/Shop/Shop'
import Signup from './Page/Signup/Signup';
import Login from './Page/Login/Login';
import Cart from './Page/Cart/Cart';
import PlaceOrder from './Page/Checkout/Checkout';
import Order from './Page/Order/Order';
import PageNotFount from './Page/404/PageNotFount';
import CliendOrders from './AdminPage/CliendOrders/CliendOrders';
import Product from './Page/Product/Product';



function App() {
  const user = useSelector(state => state.user.userInfo.isAthu)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  },)
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='product/:id'element={<Product />} />
          <Route path="/signup" element={user? <Navigate to="/" />:<Signup/>} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/checkout" element={<PlaceOrder/> }/>
          <Route path='/whyadmin' element={<UpdateTap />} />
          <Route path='/order' element={<Order />} />

          <Route path='/admin/addproduct' element={<AddProduct />} />
          <Route path='admin/orders' element={<CliendOrders />} />
          
          <Route path='*' element={<PageNotFount />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
