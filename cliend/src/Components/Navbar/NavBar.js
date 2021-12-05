import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'
import {useSelector} from 'react-redux'

function NavBar() {
    const user = useSelector(state => state.user.userInfo)
    console.log(user);
    

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
                <Link to="cart">Cart</Link>
                {user.isAthu ? <button onClick={() => localStorage.removeItem('accesstoken')} to="/login">
                    {user.name}Logout</button> : <Link to="/login">Login</Link>}
            </div>

        </div>
    )
}

export default NavBar
