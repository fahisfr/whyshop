import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import { BiCart, BiSearch } from "react-icons/bi";

import { FiAlignLeft, FiArchive, } from "react-icons/fi";
import './NavBar.css'
import { useSelector } from 'react-redux'
import SideBar from '../SideBar/SideBar'
import  { ImagePath } from '../../Axios'


function NavBar(props) {
    const { isAthu } = useSelector(state => state.user.userInfo)
    const { products } = useSelector(state => state.products)
    const [sidebar, setsidebar] = useState(false)
    const [result, setresult] = useState([])
    const [search, setsearch] = useState('')
    const  SearchProduts= (id) => {
        if (id === '') return setresult([])
        setresult(products.filter(item => item.name.toLowerCase().includes(id.toLowerCase())))
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
                    <input type='text' max={12} className='nav-search-input' value={search} onChange={(e) => {
                        SearchProduts(e.target.value)
                        setsearch(e.target.value)
                        
                    }} onClick={()=>SearchProduts(search)} placeholder='search for products'></input>
                    <button><BiSearch size={22} /></button>
                </div>
                {
                    result.length !== 0 && (
                        <div className='nav-search-result'>
                            {
                                result.slice(0, 9).map((item, index) => {
                                    return (
                                        <Link to={`/product/${item.name}`} style={{ textDecoration: 'none' }} onClick={() => {
                                            setsearch(item.name)
                                            setresult([])
                                        }} >
                                            <div className='nav-search-result-item'  key={index} >
                                                <img src={ImagePath(item.imageId)} alt='product' />
                                                <span className="nav-search-result-item-name ">{item.name}</span>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
            {isAthu ? <div className='nav-4-box'>
                <Link to='/order'>< FiArchive size={22} color='white' /> </Link><span className='nav-4-1-s'>Orders</span>
                <Link to='/cart'><BiCart size={31} color='white' /></Link><span  >Cart</span>
            </div>
                : <div className='nav-4-box-ls'>
                    <Link to='/login'><button className='nav-4-3-l'  >Loign in</button></Link>
                    <Link to='/signup'><button className='nav-4-4-s'>Sign Up</button></Link>
                </div>
            }
        </div>
    )
}

export default NavBar
