import React, {  } from 'react';
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";



import Home from './Page/Home/Home'
import UpdateTap from './AdminPage/Update-Tap/Update-Tap';
import AddProduct from './AdminPage/AddProduct/AddProduct';
import Products from './Page/Productes/Products'
import Signup from './Page/Signup/Signup';
import Login from './Page/Login/Login';
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
        
          <Route path='/whyadmin' element={<UpdateTap />} />
          <Route path='/whyadmin/addproduct' element={<AddProduct/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
