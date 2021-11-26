import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'
function NavBar() {
    return (
        <div className='navbar'>
            <div className="logo">
                <h1 className='logo-t'>FrShop.com</h1>
            </div>
            <div className="search-bar">
                <input className="search" type="text" />
            </div>
            <div className="icons">
                <Link to="#">Order</Link>
                <Link to="#">Cart</Link>
                {(localStorage.getItem('token')?<button onClick={()=>localStorage.removeItem('token')} to="/login">Logout</button>:<Link to="/login">Login</Link>)}
                
            </div>

        </div>
    )
}

export default NavBar
