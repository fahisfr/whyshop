import React from 'react'
import { Link } from 'react-router-dom'
import { BiCart } from "react-icons/bi";

import { FiTruck, FiAlignLeft, FiArchive } from "react-icons/fi";
import './NavBar.css'
import {useSelector} from 'react-redux'

function NavBar() {
    const user = useSelector(state => state.user.userInfo)
   
    return (
        <div className="navbar">
            <div className='nav-1-box'>
                <FiAlignLeft size={45} color=' white'/>

            </div > 

            <div className='nav-2-box'>
                <Link to='/'><h1>FRShop<span>.com</span></h1></Link>
            </div>

            <div className='nav-3-box'>
                <input type='text' placeholder='search for products'></input>
                <button>Search</button>

            </div>


            <div className='nav-4-box'>
                <Link to='orders'>< FiArchive size={27} color='white' /> </Link><span className='nav-4-1-s'>Orders</span>
                <Link to='/cart'><BiCart size={37} color='white'/></Link><span  >Cart</span>
            
               
              

            </div>
        </div>
    )
}

export default NavBar
