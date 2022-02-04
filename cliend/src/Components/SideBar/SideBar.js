import axios from '../../Axios'
import React from 'react'
import './SideBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout} from '../../Features/User'
import { Link } from 'react-router-dom'


function SIdeBar(props) {
    const { name,number } = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const logoutNow = () => {
        axios.delete('logout').then(response => {
            dispatch(logout())
            props.settrigger(false)
            localStorage.removeItem('accesstoken')
        })
    }
    return (props.trigger) ? (
        <div className="sidebar-container" >
            <div className='sidebar-left-menu'>
                <div className='sidebar-left-menu-header'>
                    <img src="/profile640.png" alt='' />
                    <div className='sidebar-left-header-info'>
                        <span className='sidebar-we'>{name}</span>
                        <span>{number}</span>
                    </div>
                </div>
                <div className='sidebar-left-menu-body'>
                    <Link to='/' className='sidebar-left-menu-body-link'>
                    </Link>
                    <Link className='sidebar-link' to='/account'>My Account</Link>
                    <Link className='sidebar-link' to='/'> Home</Link>
                    <Link className='sidebar-link' to='/order'> Orders</Link>
                    <Link className='sidebar-link' to='/cart'> Cart</Link>
                    <Link className='sidebar-link' to='/livechat'> My Chats</Link>
                    <Link className='sidebar-link ' onClick={() => logoutNow()} style={{ color: 'red' }} to='/'>Logout</Link>
                </div>
            </div>
            <div className='sidebar-close' onClick={() => props.settrigger(false)} ></div>
        </div>

    ) : "";
}
export default SIdeBar
