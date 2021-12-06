import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";


import Home from './Page/Home/Home'
import UpdateTap from './AdminPage/Update-Tap/Update-Tap';
import AddProduct from './AdminPage/AddProduct/AddProduct';
import Products from './Page/Productes/Products'
import Signup from './Page/Signup/Signup';
import Login from './Page/Login/Login';
import Cart from './Page/Cart/Cart';
function App() {
  const [user, setUser] = useState(true);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/signup" element={user? <Navigate to="/" />:<Signup/>} />
          <Route path="/login" element={user? <Navigate to="/" /> : <Login />} />
          <Route path='/whyadmin' element={<UpdateTap />} />
          <Route path='/whyadmin/addproduct' element={<AddProduct />} />
         
        </Routes>
      </Router>

    </div>
  );
}

export default App;
