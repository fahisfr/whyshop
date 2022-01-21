import axios from '../../Axios'
import React from 'react'
import './SideBar.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../Features/User'

function SIdeBar(props) {
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
                <div className='left-profile'>
                    <img src='' alt='' />
                </div>
                <div className='left-logout'>
                    <button onClick={()=>logoutNow()}>Logout</button>
                </div>
            </div>
            <div className='sidebar-close' onClick={() => props.settrigger(false)} ></div>
        </div>
        
    ) : "";
}
export default SIdeBar
