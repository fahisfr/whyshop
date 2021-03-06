import React  from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";


import { useSelector } from 'react-redux'


import Home from './Page/Home/Home'
import Shop from './Page/Shop/Shop'
import Signup from './Page/Signup/Signup';
import Login from './Page/Login/Login';
import Cart from './Page/Cart/Cart';
import PlaceOrder from './Page/Checkout/Checkout';
import Orders from './Page/Orders/Orders';
import PageNotFount from './Page/404/PageNotFount';
import Product from './Page/Product/Product';
import Feedback from './Page/Feedback/Feedback'
import Order from './Page/Order/Order';




function App() {
  const user = useSelector(state => state.user.userInfo.isAuth)
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
          <Route path='/orders' element={<Orders />} />
          <Route path="/order/:id" element={<Order/>} />
          <Route path="feedback" element={<Feedback/>} />
          <Route path='*' element={<PageNotFount />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
