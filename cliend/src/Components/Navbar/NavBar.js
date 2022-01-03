import React from 'react'
import { Link } from 'react-router-dom'
import { BiCart, BiSearch } from "react-icons/bi";

import { FiAlignLeft, FiArchive,  } from "react-icons/fi";
import './NavBar.css'
import {useSelector} from 'react-redux'
import Button from '@restart/ui/esm/Button';

function NavBar() {
    console.log(useSelector(state=>state.user.userInfo))
    const user = useSelector(state => state.user.userInfo.isAthu)
    function showdom() {
        console.log(document.getElementById('navbar'))
    }
    return (
        <div className="navbar">
            <div className='nav-1-box'>
                <FiAlignLeft size={35} color=' white'/>
            </div > 

            <div className='nav-2-box'>
                <Link to='/'><h1>FRShop<span>.com</span></h1></Link>
            </div>

            <div className='nav-3-box'>
                <input type='text' className='nav-3-1-in' placeholder='search for products'></input>
                <button><BiSearch size={20}/></button>

            </div>


            {user ? <div className='nav-4-box'>
                <Link to='/orders'>< FiArchive size={22} color='white' /> </Link><span className='nav-4-1-s'>Orders</span>
                <Link to='/cart'><BiCart size={31} color='white' /></Link><span  >Cart</span>
            </div>
                : <div className='nav-4-box-ls'>
                    <Link to='/login'><Button className='nav-4-3-l'  >Loign in</Button></Link>
                    <Link to='/signup'><button className='nav-4-4-s'>Sign Up</button></Link>
                </div>
            }
            {showdom()}
        </div>
    )
}

export default NavBar
