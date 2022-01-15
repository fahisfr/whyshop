import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiCart, BiSearch } from "react-icons/bi";

import { FiAlignLeft, FiArchive, } from "react-icons/fi";
import './NavBar.css'
import { useSelector } from 'react-redux'
import Button from '@restart/ui/esm/Button';

import SideBar from '../SideBar/SideBar'
import Axios, { ImagePath } from '../../Axios'

function NavBar(props) {
    const history = useNavigate()
    const user = useSelector(state => state.user.userInfo.isAthu)
    const [sidebar, setsidebar] = useState(false)
    const [result, setresult] = useState([])
    function SearchProduts(value) {
        if (value === '') return setresult([])
        Axios.get('/search-products/' + value, { id: value }).then(res => {
            setresult(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="navbar" >
            <SideBar trigger={sidebar} settrigger={setsidebar} />
            <div className='nav-1-box'>
                <FiAlignLeft size={37} onClick={(e) => setsidebar(!sidebar)} color=' white' />
            </div >

            <div className='nav-2-box'>
                <Link to='/'><h1>WhyShop<span>.com</span></h1></Link>
            </div>

            <div className='nav-3-box'>
                <div className='nav-3-1'>
                    <input type='text' max={12} className='nav-search-input' onChange={(e) => SearchProduts(e.target.value)} placeholder='search for products'></input>
                    <button><BiSearch size={22} /></button>
                </div>
                
                    {
                        result.length !== 0 && (
                            <div className='nav-search-result'>
                                {
                                    result.slice(0, 9).map((item, index) => {
                                        return (
                                            <div className='nav-search-result-item' onClick={() => history(`product/${item.name}`)} key={index}>
                                                <img src={ImagePath(item.imageId)} alt='product' />
                                                <span>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
               
            </div>


            {user ? <div className='nav-4-box'>
                <Link to='/order'>< FiArchive size={22} color='white' /> </Link><span className='nav-4-1-s'>Orders</span>
                <Link to='/cart'><BiCart size={31} color='white' /></Link><span  >Cart</span>
            </div>
                : <div className='nav-4-box-ls'>
                    <Link to='/login'><Button className='nav-4-3-l'  >Loign in</Button></Link>
                    <Link to='/signup'><button className='nav-4-4-s'>Sign Up</button></Link>
                </div>
            }
        </div>
    )
}

export default NavBar
